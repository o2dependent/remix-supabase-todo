import { Flex, Grid, Text, TextFieldInput } from "@radix-ui/themes";

export const Personal = () => {
	return (
		<Flex direction="column" gap="3">
			<Text size="5" weight="bold">
				User Information
			</Text>
			<Grid columns={{ initial: "1", sm: "2" }} gap="2">
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						Username <Text color="red">*</Text>
					</Text>
					<TextFieldInput
						id="username"
						name="username"
						placeholder="ComradeWiki"
					/>
				</Flex>
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						Profile Picture
					</Text>
				</Flex>
			</Grid>
		</Flex>
	);
};
