import * as z from 'zod';

export const formschema = z.object({
	companyName: z.string().min(1),
	carModel: z.string().min(1),
	yearPurchased: z.string().min(1),
	fuelType: z.string().min(1),
	kmTravelled: z.number().min(1),
});

export type formData = z.infer<typeof formschema>;
