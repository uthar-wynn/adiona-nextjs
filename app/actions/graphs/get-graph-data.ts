"use server"

import db from "@/lib/db"
import { format } from "date-fns"

export type GraphDataType = Awaited<ReturnType<typeof GetGraphData>>

export const GetGraphData = async (id: string) => {
    const vehicle = await db.vehicle.findUnique({
        where: { id }
    })

    if (!vehicle) throw new Error("Vehicle not found")

    // Alle tankbeurten
    const fillupsRaw = await db.fillup.findMany({
        where: { vehicle_id: id },
        orderBy: { date: 'asc' }
    })

    // Aggregate voor _sum, _avg etc...
    const fillUpsAggregate = await db.fillup.aggregate({
        _avg: {
            consumption: true
        },
        where: {
            vehicle_id: id,
            full: true
        }
    })

    // Bewerk tankbeurten en voeg extra waarden aan toe
    const fillups = fillupsRaw
        .filter((item) => item.full)
        .map(fillup => ({
            ...fillup,
            avg: {
                consumption: fillUpsAggregate._avg.consumption || 0
            }
        }))

    // Bereken de maandelijkste kosten en tankbeurten
    const monthlyCosts = fillupsRaw.reduce((acc, curr, index, arr) => {
        const month = format(curr.date, "yyyy-MM")
        if (!acc[month]) {
            acc[month] = {
                month,
                totalCost: 0,
                minDistance: curr.distance,
                maxDistance: curr.distance,
                totalDistance: 0
            }
        }

        acc[month].minDistance = Math.min(acc[month].minDistance, curr.distance)
        acc[month].maxDistance = Math.max(acc[month].maxDistance, curr.distance)

        let drivenDistance = 0
        if (index > 0)
            drivenDistance = curr.distance - arr[index - 1].distance
        else
            drivenDistance = acc[month].maxDistance - acc[month].minDistance

        acc[month].totalCost += curr.volume_price
        acc[month].totalDistance += drivenDistance

        return acc
    }, {} as Record<string, { month: string, totalCost: number, minDistance: number, maxDistance: number, totalDistance: number }>)

    const sortedMonthlyCosts = Object.values(monthlyCosts).sort((a, b) => a.month.localeCompare(b.month))

    return {
        fillups,
        monthlyCosts: sortedMonthlyCosts
    }
}