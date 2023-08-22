import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { useState } from "react";
import type { Database } from "~/database";

export const useSupabase = (SUPABASE_URL: string, SUPABASE_ANON_KEY: string) =>
	useState(() =>
		createBrowserClient<Database>(SUPABASE_URL ?? "", SUPABASE_ANON_KEY ?? ""),
	)[0];
