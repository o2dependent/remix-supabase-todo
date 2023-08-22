import { Flex, Grid, Select, Text, TextFieldInput } from "@radix-ui/themes";
import React from "react";
import { states } from "./states";

type Props = {
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: number | undefined;
	setAddress1: React.Dispatch<React.SetStateAction<string>>;
	setAddress2: React.Dispatch<React.SetStateAction<string>>;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	setState: React.Dispatch<React.SetStateAction<string>>;
	setZip: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const Address = ({
	address1,
	address2,
	city,
	state,
	zip,
	setAddress1,
	setAddress2,
	setCity,
	setState,
	setZip,
}: Props) => {
	return (
		<Flex direction="column" gap="3">
			<Text size="5" weight="bold">
				Address
			</Text>
			<Grid columns={{ initial: "1", sm: "2" }} gap="2">
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						Address Line 1 <Text color="red">*</Text>
					</Text>
					<TextFieldInput
						id="address_1"
						name="address_1"
						placeholder="123 Home St."
						onChange={(e) => setAddress1(e.target.value)}
						value={address1}
					/>
				</Flex>
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						Address Line 2
					</Text>
					<TextFieldInput
						id="address_2"
						name="address_2"
						placeholder="Apt 101"
						onChange={(e) => setAddress2(e.target.value)}
						value={address2}
					/>
				</Flex>
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						City <Text color="red">*</Text>
					</Text>
					<TextFieldInput
						id="city"
						name="city"
						placeholder="Seattle"
						onChange={(e) => setCity(e.target.value)}
						value={city}
					/>
				</Flex>
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						State <Text color="red">*</Text>
					</Text>
					<Select.Root>
						<Select.Trigger
							id="state"
							name="state"
							placeholder="Washington"
							onChange={(e) => setState(e?.currentTarget?.value)}
							value={state}
						/>
						<Select.Content>
							{states?.map((name, idx) => (
								<Select.Item key={idx} value={name}>
									{name}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</Flex>
				<Flex direction="column" gap="1">
					<Text color="gray" size="2">
						Zip Code <Text color="red">*</Text>
					</Text>
					<TextFieldInput
						id="zip_code"
						name="zip_code"
						placeholder="98101"
						type="number"
						onChange={(e) => setZip(parseInt(e.target.value))}
						value={zip}
					/>
				</Flex>
			</Grid>
		</Flex>
	);
};
