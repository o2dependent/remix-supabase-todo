import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { Database } from "~/database";
import { getSupabase } from "~/utils/getSupabase";

const isProfileIncomplete = (
	profile: Database["public"]["Tables"]["profiles"]["Row"] | null,
) => {
	if (!profile) {
		return true;
	}

	return (
		!profile?.firstName ||
		!profile?.lastName ||
		!profile?.email ||
		!profile?.address ||
		!profile?.gradYear
	);
};

export const loader = async ({ request }: LoaderArgs) => {
	const response = new Response();

	const supabase = getSupabase({ request, response });

	const {
		data: { session },
	} = await supabase.auth.getSession();
	const user = session?.user;
	if (!session || !user) {
		return redirect("/login", {
			headers: response.headers,
		});
	}

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.single();

	if (error || isProfileIncomplete(profile)) {
		return redirect("/app/onboarding", {
			headers: response.headers,
		});
	}

	return json(
		{
			profile,
		},
		{
			headers: response.headers,
		},
	);
};

export default function AppIndex() {
	return (
		<div>
			<h1>App Index</h1>
		</div>
	);
}
