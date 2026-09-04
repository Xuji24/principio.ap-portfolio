"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const SESSION_FLAG = "pv_tracked";

export default function VisitorTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_FLAG)) return;

    const supabase = createClient();
    supabase
      .from("page_views")
      .insert({ path: window.location.pathname })
      .then(({ error }) => {
        if (!error) sessionStorage.setItem(SESSION_FLAG, "1");
      });
  }, []);

  return null;
}
