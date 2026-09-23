import { Sidebar } from "@/components/shell/Sidebar";
import { MobileNav } from "@/components/shell/MobileNav";
import { TopBar } from "@/components/shell/TopBar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.rpc("page_view_count");
  const viewCount = typeof data === "number" ? data : 0;

  return (
    <div className="flex min-h-dvh bg-paper">
      <Sidebar viewCount={viewCount} />
      <MobileNav />
      <main className="flex-1 relative px-6 pt-12 pb-6 md:px-9 md:py-8 lg:pt-8">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
