import { Button, Flex, Text, TextFieldInput } from "@radix-ui/themes";
import { useOutletContext } from "@remix-run/react";
import React from "react";
import type { ContextValues } from "~/root";

type Props = {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setIsVerifying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm = ({
	email,
	setEmail,
	setError,
	setIsVerifying,
}: Props) => {
	const { supabase } = useOutletContext<ContextValues>();

	const sendLoginLink = async () => {
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				shouldCreateUser: false,
			},
		});
		console.log({ error });
		if (!error) {
			setIsVerifying(true);
			return;
		}

		if (error.status === 429) {
			setError("Too many requests. Try again in a few minutes.");
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				sendLoginLink();
			}}
			className="flex flex-col gap-2"
		>
			<Flex direction="column" gap="2">
				<Text aria-label="email">Email</Text>
				<TextFieldInput
					id="email"
					aria-labelledby="email"
					placeholder="me@email.com"
					onFocus={() => setError("")}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button size="2" type="submit">
					Login
				</Button>
			</Flex>
		</form>
	);
};
