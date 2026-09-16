import { load } from "js-yaml";

// A minimal frontmatter splitter, in place of `gray-matter` — gray-matter
// pins an old, vulnerable js-yaml@3.x with no fix released, and hasn't been
// updated since 2023. Our frontmatter needs are simple (title, date, a few
// strings/arrays), so a ~15-line split + patched js-yaml@5 avoids the
// dependency entirely instead of fighting its transitive pin.
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export function parseFrontmatter<T extends object>(
  raw: string,
): { data: T; content: string } {
  const match = FRONTMATTER_PATTERN.exec(raw);
  if (!match) {
    return { data: {} as T, content: raw };
  }
  const [, yamlBlock, content] = match;
  const data = (load(yamlBlock) ?? {}) as T;
  return { data, content: content.trim() };
}
