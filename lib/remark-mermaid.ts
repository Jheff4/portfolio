import { visit } from "unist-util-visit";
import type { Root, Parent } from "mdast";

interface CodeNode {
  type: "code";
  lang?: string | null;
  value: string;
}

// Shiki has no "mermaid" grammar — handing a ```mermaid fence to
// rehype-pretty-code would throw at compile time, not just render badly.
// So this rewrites the mdast `code` node into an MDX JSX element
// (<Mermaid chart="..." />) *before* rehype-pretty-code ever runs,
// pointing it at the Mermaid client component registered in lib/mdx.tsx.
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: CodeNode, index, parent: Parent | undefined) => {
      if (node.lang !== "mermaid" || !parent || index == null) return;

      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [
          { type: "mdxJsxAttribute", name: "chart", value: node.value },
        ],
        children: [],
        // mdast-util-mdx-jsx's node shape isn't part of the plain mdast type
        // map this plugin is typed against — cast rather than fight it.
      } as Parent["children"][number];
    });
  };
}
