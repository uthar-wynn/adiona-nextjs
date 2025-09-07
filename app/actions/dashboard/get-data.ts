"use server"

import db from "@/lib/db"
import { endOfMonth, startOfMonth, subMonths } from "date-fns"

export type DashboardDataType = Awaited<ReturnType<typeof GetDashboardData>>

export const GetDashboardData = async (id: string) => {
    const vehicle = await db.vehicle.findUnique({
        where: { id }
    })

    const avgConsumption = await db.fillup.aggregate({
        _avg: { consumption: true },
        where: { vehicle_id: id, full: true }
    })

    const vehicleData = {
        ...vehicle,
        avgConcumption: avgConsumption._avg.consumption || 0
    }

    const lastFillup = await db.fillup.findFirst({
        where: { vehicle_id: vehicle?.id },
        orderBy: { date: "desc" }
    })

    // Previous log (compare)
    const prevFillup = await db.fillup.findFirst({
        where: {
            vehicle_id: vehicle?.id,
            date: { lt: lastFillup?.date }
        },
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

    type DashboardLog = {
        type: "FILLUP" | "COST",
        id: string,
        title: string,
        date: Date,
        cost: number | 0
    }

    const [fillupsRaw, costsRaw] = await Promise.all([
        db.fillup.findMany({
            take: 7,
            where: { vehicle_id: id },
            orderBy: { date: "desc" }
        }),
        db.costs.findMany({
            take: 7,
            where: { vehicle_id: id },
            orderBy: { date: "desc" }
        })
    ])

    const fillupLogs = fillupsRaw.map((f) => ({
        type: "FILLUP" as const,
        id: f.id,
        title: "Voltanken",
        date: f.date ?? new Date(0),
        cost: f.volume_price ?? 0
    }))

    const costLogs = costsRaw.map((c) => ({
        type: "COST" as const,
        id: c.id,
        title: c.title,
        date: c.date ?? new Date(0),
        cost: c.cost ?? 0
    }))

    // Last fuel logs
    const lastLogs: DashboardLog[] = [...fillupLogs, ...costLogs]
        .sort((a, b) => b.date?.getTime() - a.date?.getTime())
        .slice(0, 7)

    return {
        vehicle: vehicleData,
        lastFillup,
        prevFillup,
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