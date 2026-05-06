import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function createSupabaseBrowserClient() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export const rolePermissions = {
  Admin: ["manage_users", "author", "review", "approve", "view"],
  Author: ["author", "view"],
  Reviewer: ["review", "view"],
  Approver: ["approve", "view"],
  Viewer: ["view"]
} as const;
