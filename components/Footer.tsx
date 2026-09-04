import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("page_view_count");
  const count = typeof data === "number" ? data : 0;

  return (
    <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      {count.toLocaleString()} visits
    </footer>
  );
}
