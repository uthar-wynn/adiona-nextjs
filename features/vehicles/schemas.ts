import { FuelType } from "@prisma/client";
import { z } from "zod";

export const vehicleSchema = z.object({
    name: z.string().min(1),
    description: z.optional(z.string()),
    fuel_type: z.nativeEnum(FuelType),
    vin: z.optional(z.string()),
    insurance: z.optional(z.string()),
    plate: z.optional(z.string()),
    make: z.optional(z.string()),
    model: z.optional(z.string()),
    year: z.optional(z.string()),
    enabled: z.optional(z.boolean()),
})

export type vehicleSchemaType = z.infer<typeof vehicleSchema>