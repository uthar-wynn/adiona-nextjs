import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { vehicleSchema } from "../schemas"

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
        zValidator("json", vehicleSchema),
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const {
                name,
                description,
                fuel_type,
                vin,
                insurance,
                plate,
                make,
                model,
                year,
                enabled
            } = c.req.valid("json")

            const vehicle = await db.vehicle.create({
                data: {
                    name,
                    description,
                    fuel_type,
                    vin,
                    insurance,
                    plate,
                    make,
                    model,
                    year,
                    enabled,
                    user_id: user.id
                }
            })


            return c.json(vehicle)
        }
    )
    .patch(
        "/:id",
        zValidator("json", vehicleSchema),
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const { id } = c.req.param()

            const {
                name,
                description,
                fuel_type,
                vin,
                insurance,
                plate,
                make,
                model,
                year,
                enabled
            } = c.req.valid("json")

            const vehicle = await db.vehicle.update({
                where: { id },
                data: {
                    name,
                    description,
                    fuel_type,
                    vin,
                    insurance,
                    plate,
                    make,
                    model,
                    year,
                    enabled
                }
            })


            return c.json(vehicle)
        }
    )
    .delete(
        "/:id",
        async (c) => {
            const user = await currentUser()

            if (!user) return c.json({ error: "Unauthorized" }, 401)

            const { id } = c.req.param()

            const vehicle = await db.vehicle.delete({
                where: { id }
            })

            return c.json(vehicle)
        }
    )


export default app