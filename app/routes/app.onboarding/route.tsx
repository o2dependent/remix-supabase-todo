import { Form } from "@remix-run/react";
import { useState } from "react";
import { Flex, Container, Card, Button, Text } from "@radix-ui/themes";
import { Background } from "../../components/background";
import { Personal } from "./personal";
import { Confirm } from "./confirm";
import { validator } from "./onboarding.validator";
import { redirect, type ActionArgs, json } from "@remix-run/node";
import { getSupabase } from "~/utils/getSupabase";

export const action = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	const values = Object.fromEntries(formData);

	const response = new Response();
	const supabase = getSupabase({ request, response });
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const id = user?.id ?? null;
	const email = user?.email ?? null;
	if (!id || !email) {
		return redirect("/login");
	}
	try {
		console.log({
			id,
			email,
			...values,
		});
		const result = validator.safeParse({
			id,
			email,
			...values,
		});
		if (!result.success) {
			console.log(result.error.flatten());
		}
		// console.log({ result });
		// const { data, error } = await supabase
		// 	.from("profiles")
		// 	.upsert(userProfile)
		// 	.eq("id", session?.user?.id)
		// 	.single();
		// if (error) {
		// 	return json({ errors, data }, { headers: response.headers });
		// }
	} catch (error) {
		console.error(error);
		return json({ error }, { headers: response.headers });
	}

	return null;
};

export default function Onboarding() {
	// error state
	const [error, setError] = useState<string>("");

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
				size="2"
			>
				<Card>
					<Form method="post">
						<fieldset style={{ border: "none", margin: 0, padding: 0 }}>
							<Flex direction="column" gap="4">
								<Flex direction="column" gap="2">
									<Text weight="medium" size="8">
										Welcome to The Comrade Wiki!
									</Text>
									<Text size="3">
										Please fill out the following information to complete your
										profile and get started.
									</Text>
									{error && <Text color="red">{error}</Text>}
								</Flex>
								<Flex direction="column" gap="2">
									<Personal />
									<Confirm />
								</Flex>
								<Button type="submit">Create Profile</Button>
							</Flex>
						</fieldset>
					</Form>
				</Card>
			</Container>
		</Flex>
	);
}
