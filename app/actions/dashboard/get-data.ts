"use server"

import db from "@/lib/db"
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns"

export type DashboardDataType = Awaited<ReturnType<typeof GetDashboardData>>

export interface DashboardGraphItem {
    last: number
    average: number
    change: number
    data: any[]
}

export interface DashboardGraphs {
    FUEL_CONSUMPTION: DashboardGraphItem
    FUEL_PRICE: DashboardGraphItem
    MONTH_COST: DashboardGraphItem
    MONTH_OTHER: DashboardGraphItem
    FUEL_COST: DashboardGraphItem
}

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
        avgConsumption: avgConsumption._avg.consumption || 0
    }

    const lastFillup = await db.fillup.findFirst({
        where: { vehicle_id: id },
        orderBy: { date: "desc" }
    })

    // Previous log (compare)
    const prevFillup = await db.fillup.findFirst({
        where: {
            vehicle_id: id,
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
            vehicle_id: id,
            date: {
                gte: startOfThisMonth,
                lte: endOfThisMonth
            }
        },
    })

    const costsThisMonth = await db.costs.aggregate({
        _sum: { cost: true },
        where: {
            vehicle_id: id,
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
            vehicle_id: id,
            date: {
                gte: startOfPrevMonth,
                lte: endOfPrevMonth
            }
        }
    })

    const costsPrevMonth = await db.costs.aggregate({
        _sum: { cost: true },
        where: {
            vehicle_id: id,
            date: {
                gte: startOfPrevMonth,
                lte: endOfPrevMonth
            }
        }
    })

    interface DashboardLog {
        type: "FILLUP" | "COST",
        id: string,
        title: string,
        date: Date,
        cost: number
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

    // Trends
    const graphCutoff = startOfMonth(subMonths(new Date(), 7))

    const avgTrendConsumption = await db.fillup.aggregate({
        _avg: { consumption: true },
        where: {
            vehicle_id: id,
            date: {
                gte: graphCutoff
            }
        }
    })

    const avgTrendUnitPrice = await db.fillup.aggregate({
        _avg: { unit_price: true },
        where: {
            vehicle_id: id
        }
    })

    const avgTrendVolumePrice = await db.fillup.aggregate({
        _avg: { volume_price: true },
        _sum: { volume_price: true },
        where: {
            vehicle_id: id,
            full: true,
            date: {
                gte: startOfMonth(subMonths(new Date(), 5)),
                lt: startOfMonth(new Date())
            }
        }
    })

    const prevPrevFillup = await db.fillup.findFirst({
        where: {
            vehicle_id: id,
            date: { lt: prevFillup?.date }
        },
        orderBy: { date: "desc" }
    })

    const avgCosts = await db.costs.aggregate({
        _sum: { cost: true },
        where: {
            vehicle_id: id,
            date: {
                gte: startOfMonth(subMonths(new Date(), 5)),
                lt: startOfMonth(new Date())
            }
        }
    })

    // Get last cost
    const lastCost = await db.costs.findFirst({
        where: { vehicle_id: id },
        orderBy: { date: "desc" }
    })

    let lastOtherMonthTotal = 0
    let previousOtherMonthTotal = 0
    let averageOtherCosts = 0
    let monthlyOtherCosts: { month: string; value: number; average: number }[] = []

    if (lastCost) {
        const startOfLastCostMonth = startOfMonth(lastCost.date)
        const endOfLastCostMonth = endOfMonth(lastCost.date)

        const lastCostMonthTotal = await db.costs.aggregate({
            _sum: { cost: true },
            where: {
                vehicle_id: id,
                date: {
                    gte: startOfLastCostMonth,
                    lte: endOfLastCostMonth
                }
            }
        })

        lastOtherMonthTotal = lastCostMonthTotal._sum.cost || 0

        const previousCost = await db.costs.findFirst({
            where: {
                vehicle_id: id,
                date: {
                    lt: startOfLastCostMonth
                }
            },
            orderBy: { date: "desc" }
        })

        if (previousCost) {
            const startOfPreviousCostMonth = startOfMonth(previousCost.date)
            const endOfPreviousCostMonth = endOfMonth(previousCost.date)

            const previousCostMonth = await db.costs.aggregate({
                _sum: { cost: true },
                where: {
                    vehicle_id: id,
                    date: {
                        gte: startOfPreviousCostMonth,
                        lte: endOfPreviousCostMonth
                    }
                }
            })

            previousOtherMonthTotal = previousCostMonth._sum.cost || 0
        }

        const allCosts = await db.costs.findMany({
            where: { vehicle_id: id },
            select: {
                date: true,
                cost: true
            }
        })

        const monthlyTotalsMap = allCosts.reduce<Record<string, { month: string; value: number; average: number }>>((acc, item) => {
            const key = format(item.date, "yyyy-MM")

            if (!acc[key]) {
                acc[key] = {
                    month: key,
                    value: 0,
                    average: 0
                }
            }

            acc[key].value += item.cost || 0

            return acc
        }, {})

        const monthlyTotalsArray = Object.values(monthlyTotalsMap)

        averageOtherCosts =
            monthlyTotalsArray.length > 0
                ? monthlyTotalsArray.reduce((sum, month) => sum + month.value, 0) / monthlyTotalsArray.length
                : 0

        monthlyOtherCosts = monthlyTotalsArray.map((month) => ({
            ...month,
            average: averageOtherCosts
        }))

    }

    const selectedFillupsRaw = await db.fillup.findMany({
        where: {
            vehicle_id: id,
            date: {
                gte: startOfMonth(subMonths(new Date(), 7))
            }
        },
        orderBy: { date: 'asc' }
    })

    const selectedMonthlyFillupsRaw = await db.fillup.findMany({
        where: {
            vehicle_id: id,
            date: {
                gte: startOfMonth(subMonths(new Date(), 5)) //6
            }
        },
        orderBy: { date: 'asc' }
    })

    const monthlyCosts = selectedMonthlyFillupsRaw.reduce((acc, curr) => {
        const month = format(curr.date, "yyyy-MM")
        if (!acc[month]) {
            acc[month] = {
                month,
                value: 0,
                average: avgTrendVolumePrice._avg.volume_price || 0
            }
        }

        acc[month].value += curr.volume_price
        return acc
    }, {} as Record<string, { month: string, value: number, average: number }>)

    const selectedConsumptionRaw = selectedFillupsRaw.map((fillup) => ({
        ...fillup,
        avg: {
            consumption: avgConsumption._avg.consumption,
            fuel_price: avgTrendUnitPrice._avg.unit_price || 0
        }
    }))

    const filteredCosts = await db.costs.findMany({
        where: {
            vehicle_id: id,
            date: {
                gte: startOfMonth(subMonths(new Date(), 5)),
                lt: startOfMonth(new Date())
            }
        },
        select: {
            date: true,
            cost: true
        },
        orderBy: { date: "asc" }
    })

    const stackedCostsMap = filteredCosts.reduce<Record<string, { month: string; fuel: number; cost: number, total: number, average: number }>>((acc, item) => {
        const key = format(item.date, "yyyy-MM")

        if (!acc[key]) {
            acc[key] = {
                month: key,
                fuel: 0,
                cost: 0,
                total: 0,
                average: 0
            }
        }

        acc[key].cost += item.cost || 0

        return acc
    }, {})

    Object.values(monthlyCosts).forEach((item) => {
        if (!stackedCostsMap[item.month]) {
            stackedCostsMap[item.month] = {
                month: item.month,
                fuel: 0,
                cost: 0,
                total: 0,
                average: 0
            }
        }

        stackedCostsMap[item.month].fuel += item.value
        stackedCostsMap[item.month].average = (((avgTrendVolumePrice._sum.volume_price || 0) + (avgCosts._sum.cost || 0)) / 5)

        stackedCostsMap[item.month].total += stackedCostsMap[item.month].fuel
        stackedCostsMap[item.month].total += stackedCostsMap[item.month].cost
    })

    const stackedCosts = Object.values(stackedCostsMap).sort((a, b) => a.month.localeCompare(b.month))

    const graphData: DashboardGraphs = {
        "FUEL_CONSUMPTION": {
            last: lastFillup?.consumption || 0,
            average: avgTrendConsumption._avg.consumption || 0,
            change: getPercentageChange(prevFillup?.consumption || 0, lastFillup?.consumption || 0),
            data: selectedConsumptionRaw
        },
        "FUEL_PRICE": {
            last: lastFillup?.unit_price || 0,
            average: avgTrendUnitPrice._avg.unit_price || 0,
            change: getPercentageChange(prevFillup?.unit_price || 0, lastFillup?.unit_price || 0),
            data: selectedConsumptionRaw
        },
        "MONTH_COST": {
            last: prevFillup?.volume_price || 0,
            average: avgTrendVolumePrice._avg.volume_price || 0,
            change: getPercentageChange(prevPrevFillup?.volume_price || 0, prevFillup?.volume_price || 0), // BUG: Is this correct? Data is same as Fuelio though
            data: Object.values(monthlyCosts)
        },
        "MONTH_OTHER": {
            last: lastOtherMonthTotal,
            average: averageOtherCosts,
            change: getPercentageChange(previousOtherMonthTotal, lastOtherMonthTotal),
            data: monthlyOtherCosts
        },
        "FUEL_COST": {
            last: prevFillup?.volume_price || 0,
            average: (((avgTrendVolumePrice._sum.volume_price || 0) + (avgCosts._sum.cost || 0)) / 5),
            change: getPercentageChange(stackedCosts.at(-3)?.total || 0, stackedCosts.at(-2)?.total || 0), //-34.9
            data: stackedCosts
        },
    }

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
        lastLogs,
        graphs: graphData
    }
}

function getPercentageChange(previous: number, current: number): number {
    if (previous === 0) return 0

    return ((current - previous) / previous) * 100
}