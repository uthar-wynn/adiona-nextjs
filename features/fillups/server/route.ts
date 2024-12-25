import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { editFillupSchema, fillupSchema } from "../schemas"

const app = new Hono()
    .get(
        "/:id",
        async (c) => {
            const { id } = c.req.param()

            const fillup = await db.fillup.findFirst({
                where: { id }
            })

            return c.json(fillup)
        }
    )
    .post(
        "/",
        zValidator("json", fillupSchema),
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const {
                vehicle_id,
                counter,
                date,
                distance,
                fuel,
                full,
                unit_price,
                volume_price,
                lastDistance
            } = c.req.valid("json")

            const lastDistanceValue = lastDistance ?? 0
            let calculatedConsumption = 0
            let newDistance = distance

            if (counter === "Dagteller") {
                calculatedConsumption = fuel / distance * 100
                newDistance += distance
            } else if (counter === "Kilometerteller") {
                calculatedConsumption = fuel / (distance - lastDistanceValue) * 100
            }

            const fillup = await db.fillup.create({
                data: {
                    vehicle_id,
                    date,
                    distance: newDistance,
                    fuel,
                    full,
                    unit_price,
                    consumption: calculatedConsumption,
                    volume_price
                }
            })

            return c.json(fillup)
        }
    )
    .patch(
        "/:id",
        zValidator("json", editFillupSchema),
        async (c) => {
            const { id } = c.req.param()

            const {
                date,
                distance,
                fuel,
                full,
                unit_price,
                consumption,
                volume_price
            } = c.req.valid("json")

            console.log("@@ROUTE", consumption)

            const fillup = await db.fillup.update({
                where: { id },
                data: {
                    date,
                    distance,
                    fuel,
                    full,
                    unit_price,
                    consumption,
                    volume_price
                }
            })

            return c.json(fillup)
        }
    )
    .delete(
        "/:id",
        async (c) => {
            const { id } = c.req.param()

            const fillup = await db.fillup.delete({
                where: { id }
            })

            return c.json(fillup)
        }
    )

export default app