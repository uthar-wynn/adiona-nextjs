"use server"

import db from "@/lib/db"
import { endOfMonth, startOfMonth, subMonths } from "date-fns"

export type DashboardDataType = Awaited<ReturnType<typeof getDashboardData>>

export const getDashboardData = async (id: string) => {
    const vehicle = await db.vehicle.findUnique({
        where: { id }
    })

    const avgConcumption = await db.fillup.aggregate({
        _avg: { consumption: true },
        where: { vehicle_id: id }
    })

    const vehicleData = {
        ...vehicle,
        avgConcumption: avgConcumption._avg.consumption || 0
    }

    const lastFillup = await db.fillup.findFirst({
        where: { vehicle_id: vehicle?.id },
        orderBy: { date: "desc" }
    })

    const this_month = new Date()
    const prev_month = subMonths(this_month, 1)

    // This month
    const startOfThisMonth = startOfMonth(this_month)
    const endOfThisMonth = endOfMonth(this_month)

    const fillupThisMonth = await db.fillup.aggregate({
        _sum: { volume_price: true },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfThisMonth,
                lte: endOfThisMonth
            }
        },
    })

    const costsThisMonth = await db.costs.aggregate({
        _sum: { cost: true },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfThisMonth,
                lte: endOfThisMonth
            }
        }
    })

    // Previous month
    const startOfPrevMonth = startOfMonth(prev_month)
    const endOfPrevMonth = endOfMonth(prev_month)

    const fillupPrevMonth = await db.fillup.aggregate({
        _sum: { volume_price: true },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfPrevMonth,
                lte: endOfPrevMonth
            }
        }
    })

    const costsPrevMonth = await db.costs.aggregate({
        _sum: { cost: true },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfPrevMonth,
                lte: endOfPrevMonth
            }
        }
    })

    // Last fuel logs
    const lastLogs = await db.fillup.findMany({
        take: 7,
        where: { vehicle_id: id },
        orderBy: { date: "desc" }
    })

    return {
        vehicle: vehicleData,
        lastFillup,
        costs: {
            thisMonth: {
                fuel: fillupThisMonth._sum.volume_price || 0,
                costs: costsThisMonth._sum.cost || 0
            },
            prevMonth: {
                fuel: fillupPrevMonth._sum.volume_price || 0,
                costs: costsPrevMonth._sum.cost || 0
            }
        },
        lastLogs
    }
}