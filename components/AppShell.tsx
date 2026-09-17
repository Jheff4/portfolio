import { Sidebar } from "./Sidebar";
import Footer from "./Footer";

// Static shell. The sidebar and footer are tagged with data-app-chrome
// (via display:contents wrappers, so the flex layout is unchanged) — blog
// reader mode hides them by rendering a <style> rule from the page itself.
// That keeps the decision where the knowledge is (the page, which reads
// ?reader=1 server-side) instead of having this layout-level component
// sniff the URL, which missed query-only client navigations.
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1660px]">
      <div data-app-chrome className="contents">
        <Sidebar />
      </div>
      <div data-app-column className="flex min-w-0 flex-1 flex-col md:border-l md:border-zinc-800">
        <main>{children}</main>
        <div data-app-chrome className="contents">
          <Footer />
        </div>
      </div>
    </div>
  );
}
