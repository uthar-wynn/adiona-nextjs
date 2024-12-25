"use server"

import db from "@/lib/db"

export type CostType = Awaited<ReturnType<typeof getCostsByVehicleId>>

export default async function getCostsByVehicleId(id: string) {
    const costs = await db.costs.findMany({
        where: {
            vehicle_id: id
        },
        orderBy: {
            date: 'desc'
        }
    })

    return costs
}