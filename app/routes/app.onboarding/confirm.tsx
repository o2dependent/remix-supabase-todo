import { Flex, Link, Switch, Text } from "@radix-ui/themes";
import React from "react";

export const Confirm = () => {
	return (
		<Flex direction="column" gap="2" px="1">
			<Text size="2">
				<label style={{ display: "block", width: "100%" }}>
					<Switch
						id="accepted_terms_and_privacy"
						name="accepted_terms_and_privacy"
						mr="2"
						size="1"
						radius="full"
					/>
					<Text>
						Accept <Link color="blue">Term of Service</Link> and{" "}
						<Link color="blue">Privacy Policy</Link>
					</Text>
				</label>
			</Text>
		</Flex>
	);
};
