// End-of-post prompt that sends readers to where the conversation already
// happens (LinkedIn, X, email) instead of hosting likes/comments on a static site.
export function PostDiscussion({ title }: { title: string }) {
  const subject = encodeURIComponent(`Re: ${title}`);
  const link = "text-amber-400 underline decoration-amber-400/30 underline-offset-4 transition-colors hover:decoration-amber-400";

  return (
    <aside className="mt-16 border-t border-zinc-800 pt-8 text-zinc-400">
      <p>
        Thoughts or questions? Reply on{" "}
        <a href="https://linkedin.com/in/etinosa-ogbevoen" target="_blank" rel="noopener noreferrer" className={link}>
          LinkedIn
        </a>{" "}
        or{" "}
        <a href="https://x.com/_Etinosa_" target="_blank" rel="noopener noreferrer" className={link}>
          X
        </a>
        , or{" "}
        <a href={`mailto:ogbevoenetinosa@gmail.com?subject=${subject}`} className={link}>
          email me
        </a>
        .
      </p>
    </aside>
  );
}
