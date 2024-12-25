import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { costSchema } from "../schemas"

const app = new Hono()
    .get(
        "/",
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const vehicles = await db.vehicle.findMany({
                where: { user_id: user.id },
                orderBy: { name: "asc" }
            })

            return c.json(vehicles)
        }
    )
    .get(
        "/enabled",
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const vehicles = await db.vehicle.findMany({
                where: {
                    user_id: user.id,
                    enabled: true
                },
                orderBy: { name: "asc" }
            })

            return c.json(vehicles)
        }
    )
    .post(
        "/",
        zValidator("json", costSchema),
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const {
                vehicle_id,
                remind_only,
                category,
                title,
                cost,
                date,
                is_income,
                repeat,
                notes,
                distance,
                remind_distance,
                remind_date,
                repeat_distance,
                repeat_months
            } = c.req.valid("json")

            const vehicle = await db.costs.create({
                data: {
                    vehicle_id,
                    remind_only,
                    category,
                    title,
                    cost,
                    date,
                    is_income,
                    repeat,
                    notes,
                    distance,
                    remind_distance,
                    remind_date,
                    repeat_distance,
                    repeat_months
                }
            })

            return c.json(vehicle)
        }
    )
    .patch(
        "/:id",
        zValidator("json", costSchema),
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const { id } = c.req.param()

            const {
                vehicle_id,
                remind_only,
                category,
                title,
                cost,
                date,
                is_income,
                repeat,
                notes,
                distance,
                remind_distance,
                remind_date,
                repeat_distance,
                repeat_months
            } = c.req.valid("json")

            const costs = await db.costs.update({
                where: { id },
                data: {
                    vehicle_id,
                    remind_only,
                    category,
                    title,
                    cost,
                    date,
                    is_income,
                    repeat,
                    notes,
                    distance,
                    remind_distance,
                    remind_date,
                    repeat_distance,
                    repeat_months
                }
            })

            return c.json(cost)
        }
    )
    .delete(
        "/:id",
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const { id } = c.req.param()

            const costs = await db.costs.delete({
                where: { id }
            })

            return c.json(costs)
        }
    )


export default app