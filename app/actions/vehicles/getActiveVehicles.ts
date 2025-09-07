"use server"

import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export type ActiveVehiclesType = Awaited<ReturnType<typeof getActiveVehicles>>

export default async function getActiveVehicles() {
    const { userId } = await auth()

    if (!userId) return []

    const vehicles = await db.vehicle.findMany({
        where: {
            user_id: userId,
            enabled: true
        },
        orderBy: {
            name: "asc"
        }
    })

    const vehiclesData = await Promise.all(
        vehicles.map(async (vehicle) => {
            const avgConcumption = await db.fillup.aggregate({
                _avg: { consumption: true },
                where: {
                    vehicle_id: vehicle.id,
                    full: true
                }
            })

            const lastFillup = await db.fillup.findFirst({
                where: { vehicle_id: vehicle.id },
                orderBy: { date: "desc" }
            })

            return {
                ...vehicle,
                avgConcumption: avgConcumption._avg.consumption || 0,
                lastDistance: lastFillup?.distance || 0
            }
        })
    )

    return vehiclesData
}