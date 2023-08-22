import { Button, Flex, TextFieldInput } from "@radix-ui/themes";
import { useNavigate, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import type { ContextValues } from "~/root";

type Props = {
	email: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
};

export const OTPForm = ({ email, setError }: Props) => {
	const { supabase } = useOutletContext<ContextValues>();

	const navigate = useNavigate();

	const [token, setToken] = useState("");

	const verifyOtp = async () => {
		const { error } = await supabase.auth.verifyOtp({
			token,
			email,
			type: "email",
		});
		if (error) {
			setError("Error verifying OTP. Check your code and try again.");
			return;
		}
		navigate("/app");
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				verifyOtp();
			}}
			className="flex flex-col gap-2"
		>
			<Flex direction="column" gap="4">
				<OTPInput
					containerStyle="w-full flex justify-center gap-2"
					value={token}
					onChange={setToken}
					numInputs={6}
					renderSeparator={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 16 16"
						>
							<circle cx="8" cy="8" r="1" fill="currentColor" />
						</svg>
					}
					shouldAutoFocus
					inputStyle={{ width: "2rem", padding: "0" }}
					renderInput={(props) => <TextFieldInput {...props} />}
				/>
				<Button type="submit">Verify</Button>
			</Flex>
		</form>
	);
};
