import { useState } from "react";
import { OTPForm } from "./otp-form";
import { LoginForm } from "./login-form";
import { redirect, type LoaderArgs, json } from "@remix-run/node";
import { getSupabase } from "~/utils/getSupabase";
import {
	Box,
	Card,
	Container,
	Flex,
	Heading,
	Separator,
} from "@radix-ui/themes";
import { Background } from "~/components/background";
import { Link } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
	const response = new Response();
	const supabase = getSupabase({ request, response });
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session && session?.user) {
		return redirect("/app", {
			headers: response.headers,
		});
	}
	return json({}, { headers: response.headers });
};

export default function Login() {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);

	return (
		<Flex
			direction={"column"}
			position={"relative"}
			height="100%"
			justify="center"
			align="center"
		>
			<Background />
			<Container
				style={{ justifyContent: "center", alignItems: "center" }}
				width={"100%"}
				height="100%"
				size="1"
			>
				<Card style={{ width: "100%" }}>
					<Flex direction="column">
						<Heading size="9">{isVerifying ? "Verify" : "Login"}</Heading>
						{isVerifying && <p className="">OTP code sent to {email}</p>}
						{error && <p className="text-red-500">{error}</p>}
						<div className="mt-8">
							{isVerifying ? (
								<OTPForm email={email} setError={setError} />
							) : (
								<LoginForm
									email={email}
									setEmail={setEmail}
									setError={setError}
									setIsVerifying={setIsVerifying}
								/>
							)}
						</div>
						{!isVerifying && (
							<>
								<Box mx="6">
									<Separator orientation="horizontal" my="2" size="4" />
								</Box>
								<Link
									to="contact"
									style={{ textAlign: "center", textDecoration: "none" }}
								>
									You don&#x27;t have an account?
								</Link>
							</>
						)}
					</Flex>
				</Card>
			</Container>
		</Flex>
	);
}
