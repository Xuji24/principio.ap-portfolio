import { Sidebar } from "@/components/shell/Sidebar";
import { TopBar } from "@/components/shell/TopBar";
import { ViewCounter } from "@/components/shell/ViewCounter";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.rpc("page_view_count");
  const viewCount = typeof data === "number" ? data : 0;

  return (
    <div className="flex min-h-dvh bg-paper">
      <Sidebar />
      <main className="flex-1 relative px-6 py-5 md:px-8 md:py-6">
        <TopBar />
        {children}
      </main>
      <ViewCounter count={viewCount} />
    </div>
  );
}
