import { z } from "zod";

export const addressSchema = z.object({
  street_address_full: z.string().min(2, {
    message: "Street address must be at least 2 characters.",
  }),
  street_address: z.string().min(2, {
    message: "Street address must be at least 2 characters.",
  }),
  street_number: z.string().min(1, {
    message: "Street number must be at least 1 character.",
  }),
  optional_address: z.string().optional(),
  suburb: z.string().min(2, {
    message: "Suburb must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  postal_code: z.number().min(4, {
    message: "Postal code must be at least 4 characters.",
  }),
  coordinates: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),
  country: z
    .enum([
      "ZA", // South Africa
      "US", // United States
      "GB", // United Kingdom
      // Add more country codes as needed
    ])
    // @ts-ignore
    .refine((value: undefined) => value !== undefined, {
      message: "Invalid country.",
    }),
});

export const realtorFormSchema = z.object({
  name: z.string().min(2, {
    message: "Realtor name must be at least 2 characters.",
  }),
  registration_number: z.string().min(2, {
    message: "Registration number must be at least 2 characters.",
  }),
  vat_number: z.any().optional(),
  website: z
    .string()
    .url({
      message: "Invalid website URL.",
    })
    .optional(),
  address: addressSchema.optional(),
  phone: z
    .string()
    .refine(
      (value: string) =>
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
          value
        ),
      {
        message: "Invalid phone number.",
      }
    )
    .optional(),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  images: z.array(z.string()).optional(),
});
