import { createServerClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/database";

export const getSupabase = (
	options: Parameters<typeof createServerClient>[2],
) => {
	return createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		options,
	);
};
