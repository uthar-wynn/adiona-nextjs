"use server"

import db from "@/lib/db"
import { differenceInCalendarDays, differenceInCalendarMonths, endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, subYears } from "date-fns"
import { EnrichedFillup, EnrichFillups } from "../fillups/enrich-fillups"

export type StatisticsDataType = Awaited<ReturnType<typeof GetStatisticsData>>

export const GetStatisticsData = async (id: string) => {
    const vehicle = await db.vehicle.findUnique({
        where: { id }
    })

    if (!vehicle) throw new Error("Vehicle not found")

    const allFillups = await db.fillup.findMany({
        where: { vehicle_id: vehicle.id },
        orderBy: { date: "desc" }
    })

    const allFillupsAggregate = await db.fillup.aggregate({
        _count: {
            date: true
        },
        _avg: {
            consumption: true,
            volume_price: true
        },
        _min: {
            consumption: true,
            fuel: true,
            volume_price: true,
            unit_price: true,
            distance: true
        },
        _max: {
            consumption: true,
            fuel: true,
            volume_price: true,
            unit_price: true,
            distance: true
        },
        _sum: {
            fuel: true,
            volume_price: true
        },
        where: { vehicle_id: id }
    })

    const allFullFillupsAggregate = await db.fillup.aggregate({
        _count: {
            date: true
        },
        _avg: {
            consumption: true,
            volume_price: true
        },
        _min: {
            consumption: true,
            fuel: true,
            volume_price: true,
            unit_price: true,
            distance: true
        },
        _max: {
            consumption: true,
            fuel: true,
            volume_price: true,
            unit_price: true,
            distance: true
        },
        _sum: {
            fuel: true,
            volume_price: true
        },
        where: {
            vehicle_id: id,
            full: true
        }
    })

    // Berekeningen van de datums
    const this_month = new Date()
    const prev_month = subMonths(this_month, 1)
    const prev_year = subYears(this_month, 1)


    // This month
    const startOfThisMonth = startOfMonth(this_month)
    const endOfThisMonth = endOfMonth(this_month)

    const fillupThisMonth = await db.fillup.aggregate({
        _count: {
            date: true
        },
        _min: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _max: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _sum: {
            fuel: true,
            volume_price: true,
            distance: true
        },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfThisMonth,
                lte: endOfThisMonth
            }
        },
    })

    // Previous month
    const startOfPrevMonth = startOfMonth(prev_month)
    const endOfPrevMonth = endOfMonth(prev_month)

    const fillupPrevMonth = await db.fillup.aggregate({
        _count: {
            date: true
        },
        _min: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _max: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _sum: {
            fuel: true,
            volume_price: true
        },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfPrevMonth,
                lte: endOfPrevMonth
            }
        }
    })

    // This year
    const startOfThisYear = startOfYear(this_month)
    const endOfThisYear = endOfYear(this_month)

    const fillupThisYear = await db.fillup.aggregate({
        _count: {
            date: true
        },
        _min: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _max: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _sum: {
            fuel: true,
            volume_price: true
        },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfThisYear,
                lte: endOfThisYear
            }
        }
    })

    // Last year
    const startOfPrevYear = startOfYear(prev_year)
    const endOfPrevYear = endOfYear(prev_year)

    const fillupLastYear = await db.fillup.aggregate({
        _count: {
            date: true
        },
        _min: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _max: {
            consumption: true,
            fuel: true,
            distance: true
        },
        _sum: {
            fuel: true,
            volume_price: true
        },
        where: {
            vehicle_id: vehicle?.id,
            date: {
                gte: startOfPrevYear,
                lte: endOfPrevYear
            }
        }
    })

    // Distances
    const distancePrevMonth = await getDistanceForPeriod(vehicle.id, startOfPrevMonth, endOfPrevMonth)
    const distanceThisMonth = await getDistanceForPeriod(vehicle.id, startOfThisMonth, endOfThisMonth)
    const distanceThisYear = await getDistanceForPeriod(vehicle.id, startOfThisYear, endOfThisYear)
    const distancePrevYear = await getDistanceForPeriod(vehicle.id, startOfPrevYear, endOfPrevYear)

    const drivenDistance = (allFillupsAggregate._max.distance || 0) - (allFillupsAggregate._min.distance || 0)

    // Differences
    const firstFillup = await db.fillup.findFirst({
        where: { vehicle_id: id },
        orderBy: { date: "asc" }
    })

    const lastFillup = await db.fillup.findFirst({
        where: { vehicle_id: id },
        orderBy: { date: "desc" }
    })


    const now = new Date()
    const first = firstFillup?.date ?? null

    const diffInDays = first ? Math.max(1, differenceInCalendarDays(now, first) + 1) : 1
    const diffInMonths = first ? differenceInCalendarMonths(now, first) + 1 : 1

    const costDay = (allFillupsAggregate._sum.volume_price || 0) / diffInDays
    const costMonth = costDay * (365.2425 / 12)

    const avgDistanceDay = drivenDistance > 0 ? drivenDistance / diffInDays : 0
    const avgDistanceMonth = drivenDistance > 0 ? drivenDistance / diffInMonths : 0

    const fillups = EnrichFillups(allFillups)

    const distanceCostStats = CalculateDistanceCostStats(fillups)

    return {
        fuel: {
            fillups: {
                total: allFillupsAggregate._count.date || 0,
                this_year: fillupThisYear._count.date || 0,
                last_year: fillupLastYear._count.date || 0,
                this_month: fillupThisMonth._count.date || 0,
                last_month: fillupPrevMonth._count.date || 0,
            },
            fuel: {
                sum: allFillupsAggregate._sum.fuel || 0,
                this_year: fillupThisYear._sum.fuel || 0,
                last_year: fillupLastYear._sum.fuel || 0,
                this_month: fillupThisMonth._sum.fuel || 0,
                last_month: fillupPrevMonth._sum.fuel || 0,
                min: allFillupsAggregate._min.fuel || 0,
                max: allFillupsAggregate._max.fuel || 0
            },
            average: {
                avg: allFullFillupsAggregate._avg.consumption || 0,
                min: allFullFillupsAggregate._min.consumption || 0,
                max: allFullFillupsAggregate._max.consumption || 0,
            }
        },
        cost: {
            costs: {
                total: allFillupsAggregate._sum.volume_price || 0,
                this_year: fillupThisYear._sum.volume_price || 0,
                last_year: fillupLastYear._sum.volume_price || 0,
                this_month: fillupThisMonth._sum.volume_price || 0,
                last_month: fillupPrevMonth._sum.volume_price || 0,
            },
            billing: {
                min: allFillupsAggregate._min.volume_price || 0,
                max: allFillupsAggregate._max.volume_price || 0
            },
            fuel_price: {
                min: allFillupsAggregate._min.unit_price || 0,
                max: allFillupsAggregate._max.unit_price || 0
            },
            avg_cost: {
                total: distanceCostStats.avg,
                min: distanceCostStats.min,
                max: distanceCostStats.max,
            },
            costDay,
            costMonth
        },
        distance: {
            total: drivenDistance,
            distances: {
                last: allFillupsAggregate._max.distance || 0,
                this_year: distanceThisYear,
                last_year: distancePrevYear,
                this_month: distanceThisMonth,
                last_month: distancePrevMonth
            },
            avgDistanceDay,
            avgDistanceMonth
        }
    }
}

const GetLastDistance = async (vehicle_id: string, date: Date): Promise<number | null> => {
    const fillup = await db.fillup.findFirst({
        where: {
            vehicle_id,
            date: {
                lt: date
            }
        },
        orderBy: { date: "desc" }
    })

    return fillup?.distance ?? null
}

const CalculateDistanceCostStats = (fillups: EnrichedFillup[]) => {
    const data = fillups
        .filter((item) => item.full)
        .map((item) => item.distanceCost)
        .filter((cost) => cost !== null) as number[]

    if (data.length === 0) return { min: 0, max: 0, avg: 0 }

    const min = Math.min(...data)
    const max = Math.max(...data)
    const avg = data.reduce((sum, cost) => sum + cost, 0) / data.length

    return { min, max, avg }
}

const getDistanceForPeriod = async (vehicle_id: string, start: Date, end: Date) => {
    const agg = await db.fillup.aggregate({
        _count: { date: true },
        _min: { distance: true },
        _max: { distance: true },
        where: {
            vehicle_id, date: { gte: start, lte: end }
        }
    })

    const count = agg._count?.date ?? 0
    const maxIn = agg._max?.distance ?? null
    const minIn = agg._min?.distance ?? null

    if (count === 0 || maxIn == null) return 0

    const baselineBefore = await GetLastDistance(vehicle_id, start)

    if (baselineBefore != null)
        return Math.max(0, maxIn - baselineBefore)

    if (count >= 2 && minIn != null)
        return Math.max(0, maxIn - minIn)

    return 0
}