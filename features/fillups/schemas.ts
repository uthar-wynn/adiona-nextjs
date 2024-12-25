import { z } from "zod";

export const fillupSchema = z.object({
    vehicle_id: z.string().min(1, { message: "Voertuig verplicht" }),
    counter: z.string(),
    date: z.coerce.date({ required_error: "The datum is verplicht" }),
    distance: z.coerce.number(),
    fuel: z.coerce.number(),
    full: z.boolean(),
    unit_price: z.coerce.number(),
    consumption: z.coerce.number(),
    volume_price: z.coerce.number(),
    lastDistance: z.number().optional()
})

export type fillupSchemaType = z.infer<typeof fillupSchema>

export const editFillupSchema = z.object({
    vehicle_id: z.string().min(1, { message: "Voertuig verplicht" }),
    counter: z.string(),
    date: z.coerce.date({ required_error: "The datum is verplicht" }),
    distance: z.coerce.number(),
    fuel: z.coerce.number(),
    full: z.boolean(),
    unit_price: z.coerce.number(),
    consumption: z.coerce.number(),
    volume_price: z.coerce.number(),
    lastDistance: z.number().optional()
}).passthrough()

export type editFillupSchemaType = z.infer<typeof editFillupSchema>