import * as z from 'zod';

export const formschema = z.object({
	companies: z.string().nullable(),
	car_models: z.string().nullable(),
	years: z.string().nullable(),
	fuel_types: z.string().nullable(),
	kmTravelled: z.number().min(1),
});

export type formData = z.infer<typeof formschema>;
