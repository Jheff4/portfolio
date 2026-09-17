import { visit } from "unist-util-visit";
import type { Root, Parent, Paragraph, Text } from "mdast";

const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|DANGER)\]\s*\n?/i;

// GitHub-style alert syntax:
//   > [!TIP]
//   > Some helpful tip here.
// remark parses that as an ordinary blockquote whose first paragraph starts
// with the literal text "[!TIP]". This rewrites that blockquote into a
// <Callout type="tip"> element (before rehype-pretty-code or anything else
// touches the tree), stripping the marker text from the paragraph it lived in.
export function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, "blockquote", (node: Parent, index, parent: Parent | undefined) => {
      if (!parent || index == null) return;

      const firstChild = node.children[0] as Paragraph | undefined;
      const firstText = firstChild?.children?.[0] as Text | undefined;
      if (firstChild?.type !== "paragraph" || firstText?.type !== "text") return;

      const match = MARKER.exec(firstText.value);
      if (!match) return;

      const type = match[1].toLowerCase();
      firstText.value = firstText.value.slice(match[0].length);
      // Drop the leading text node entirely if the marker was on its own line.
      if (firstText.value === "") {
        firstChild.children.shift();
      }

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Callout",
        attributes: [{ type: "mdxJsxAttribute", name: "type", value: type }],
        children: node.children,
        // mdast-util-mdx-jsx's node shape isn't part of the plain mdast type
        // map this plugin is typed against — cast rather than fight it.
      } as Parent["children"][number];
    });
  };
}
