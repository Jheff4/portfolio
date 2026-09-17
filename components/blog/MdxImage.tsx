import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { imageSize } from "image-size";

// Local images (referenced by an absolute /public path, e.g. /blog/my-post/diagram.png)
// get their real width/height read straight off the file, so next/image can
// reserve the right space with zero layout shift — no manual width/height
// needed in the markdown itself. Remote images fall back to a plain <img>.
export function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;

  const filePath = src.startsWith("/") ? path.join(process.cwd(), "public", src) : null;

  // Remote, or a local path whose file hasn't been added to /public yet: render
  // a plain <img> instead of crashing the build on readFileSync.
  if (!filePath || !fs.existsSync(filePath)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- remote image, next/image can't read its dimensions
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="my-10 w-full rounded-xl border border-zinc-800 shadow-lg shadow-black/30"
      />
    );
  }

  const { width, height } = imageSize(fs.readFileSync(filePath));

  return (
    <span className="my-10 block">
      <Image
        src={src}
        alt={alt ?? ""}
        width={width}
        height={height}
        className="w-full rounded-xl border border-zinc-800 shadow-lg shadow-black/30"
        sizes="(max-width: 768px) 100vw, 720px"
      />
      {alt && (
        <span className="mt-3 block text-center text-sm italic text-zinc-500">{alt}</span>
      )}
    </span>
  );
}
