import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction, type LoaderArgs } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useRevalidator,
} from "@remix-run/react";
// import stylesheet from "~/tailwind.css";
import mainStylesheet from "~/main.css";
import stylesheet from "@radix-ui/themes/styles.css";
import { useSupabase } from "./hooks/useSupabase";
import { getSupabase } from "./utils/getSupabase";
import { useEffect } from "react";
import { Theme } from "@radix-ui/themes";

type Supabase = ReturnType<typeof getSupabase>;
export interface ContextValues {
	supabase: Supabase;
	session: Awaited<
		ReturnType<Supabase["auth"]["getSession"]>
	>["data"]["session"];
	env: {
		SUPABASE_URL: string;
		SUPABASE_ANON_KEY: string;
		SCHOOL_NAME: string;
	};
}

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
	{ rel: "stylesheet", href: mainStylesheet },
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
	const env = {
		SUPABASE_URL: process.env.SUPABASE_URL!,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
		SCHOOL_NAME: process.env.SCHOOL_NAME!,
	};

	const response = new Response();

	const supabase = getSupabase({ request, response });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return json(
		{
			env,
			session,
		},
		{
			headers: response.headers,
		},
	);
};

export default function App() {
	const { env, session } = useLoaderData<typeof loader>();
	const { revalidate } = useRevalidator();
	const supabase = useSupabase(
		env?.SUPABASE_URL ?? "",
		env?.SUPABASE_ANON_KEY ?? "",
	);

	const serverAccessToken = session?.access_token;

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (
				event !== "INITIAL_SESSION" &&
				session?.access_token !== serverAccessToken
			) {
				// server and client are out of sync.
				revalidate();
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [serverAccessToken, supabase, revalidate]);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Theme
					appearance="dark"
					accentColor="purple"
					style={{ height: "100%" }}
				>
					<Outlet
						context={{ supabase, session, env } satisfies ContextValues}
					/>
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</Theme>
			</body>
		</html>
	);
}
