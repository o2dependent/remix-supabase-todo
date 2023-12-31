import {
	redirect,
	type LoaderFunction,
	type V2_MetaFunction,
} from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader: LoaderFunction = () => {
	return redirect("/app");
};

export default function Index() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<Link to="/login">Login</Link>
		</div>
	);
}
