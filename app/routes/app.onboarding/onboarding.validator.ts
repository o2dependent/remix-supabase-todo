import { z } from "zod";
import { states } from "./states";

export const validator = z.object({
	id: z
		.string()
		.nonempty({ message: "Something went wrong! Please log in again." }),
	first_name: z.string().nonempty({ message: "First name is required" }),
	middle_name: z.string().optional(),
	last_name: z.string().nonempty({ message: "Last name is required." }),
	address_1: z.string().nonempty({ message: "Address is required." }),
	address_2: z.string().optional(),
	city: z.string().nonempty({ message: "City is required." }),
	state: z.enum(states, { required_error: "State is required." }),
	zip_code: z
		.string()
		.regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Zip code must be valid." })
		.nonempty({ message: "Zip code is required." }),
	grad_year: z
		.number()
		.min(new Date().getFullYear() - 2, {
			message: "Graduation year is required and cannot be in the past.",
		})
		.max(
			new Date().getFullYear() + 50,
			"Graduation year is too far in the future.",
		),
	accepted_terms_and_privacy: z.literal<boolean>(true, {
		required_error: "You must accept the terms and privacy policy.",
	}),
});
