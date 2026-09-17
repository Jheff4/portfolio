import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";

export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

// Main sections only: including h3 made long posts' TOCs 40+ items deep.
const HEADING_TAGS = new Set(["h2"]);

// Runs *after* rehype-slug in the pipeline, so headings already have their
// final `id`. Writing into `out` (a plain array reference passed in at
// plugin-construction time) is how a rehype plugin reports something back
// to the caller — the transform itself must return void/the tree.
export function rehypeExtractToc(out: TocEntry[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (!HEADING_TAGS.has(node.tagName)) return;
      const id = typeof node.properties?.id === "string" ? node.properties.id : undefined;
      if (!id) return;
      out.push({
        id,
        text: toString(node),
        depth: Number(node.tagName[1]),
      });
    });
  };
}
