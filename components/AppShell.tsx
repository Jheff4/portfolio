"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";

function NormalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1660px]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col md:border-l md:border-zinc-800">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

// The sidebar and footer live in the root layout, which is a plain Server
// Component with no access to the current URL's query string — only a leaf
// page can read `?reader=1` via its own `searchParams` prop. So reader mode,
// which needs to strip chrome that the *page* doesn't control, has to be
// bridged through a client component here instead.
function ShellRouter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isReaderMode = pathname.startsWith("/blog/") && searchParams.get("reader") === "1";

  if (isReaderMode) {
    return <main className="min-h-screen bg-zinc-950">{children}</main>;
  }
  return <NormalShell>{children}</NormalShell>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  // useSearchParams needs a Suspense boundary — scoping it to just this leaf
  // (rather than wrapping the whole app) keeps every other route's static
  // rendering intact. The fallback matches the normal shell so there's no
  // flash of blank content on first paint.
  return (
    <Suspense fallback={<NormalShell>{children}</NormalShell>}>
      <ShellRouter>{children}</ShellRouter>
    </Suspense>
  );
}
