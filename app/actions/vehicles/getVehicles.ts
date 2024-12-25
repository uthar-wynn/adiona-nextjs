"use server"

import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export type VehiclesType = Awaited<ReturnType<typeof getVehicles>>

export default async function getVehicles() {
    const { userId } = await auth()

    if (!userId) return []

    const vehicles = await db.vehicle.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            name: "asc"
        }
    })

    const vehicleData = await Promise.all(
        vehicles.map(async (vehicle) => {

            return {
                ...vehicle
            }
        })
    )

    return vehicleData
}