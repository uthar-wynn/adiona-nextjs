"use server"

import db from "@/lib/db"
import { Costs } from "@prisma/client"
import { format } from "date-fns"

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

    const groupedCosts = GroupCostsByMonth(costs)

    return groupedCosts
}

export const GroupCostsByMonth = (costs: Costs[]) => {
    return costs.reduce<Record<string, Costs[]>>(
        (groups, cost) => {
            const month = format(cost.date || new Date(), "MMMM yyyy")
            if (!groups[month]) groups[month] = []
            groups[month].push(cost)

            return groups
        }, {})
}