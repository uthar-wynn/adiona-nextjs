import { z } from "zod";

export const costSchema = z.object({
    vehicle_id: z.string(),
    remind_only: z.boolean(),
    category: z.string().min(1),
    title: z.string().min(1, { message: "Titel is verplicht" }),
    cost: z.optional(z.coerce.number()),
    date: z.optional(z.coerce.date()),
    is_income: z.boolean(),
    repeat: z.string(),
    notes: z.optional(z.string()),
    distance: z.optional(z.coerce.number()),
    remind_distance: z.optional(z.coerce.number()),
    remind_date: z.optional(z.coerce.date()),
    repeat_distance: z.optional(z.coerce.number()),
    repeat_months: z.optional(z.coerce.number()),
})

export type costSchemaType = z.infer<typeof costSchema>