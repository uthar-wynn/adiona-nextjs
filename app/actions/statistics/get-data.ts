"use server"

import db from "@/lib/db"
import { differenceInDays, differenceInMonths, endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, subYears } from "date-fns"
import getFillupsByVehicleId, { FillupType } from "../fillups/getFillupsByVehicleId"

export type StatisticsDataType = Awaited<ReturnType<typeof GetStatisticsData>>

export const GetStatisticsData = async (id: string) => {
    const vehicle = await db.vehicle.findUnique({
        where: { id }
    })

    if (!vehicle) throw new Error("Vehicle not found")

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
    const distancePrevMonth = fillupPrevMonth._count?.date > 1
        ? (fillupPrevMonth._max.distance || 0) - (fillupPrevMonth._min.distance || 0)
        : fillupPrevMonth._count?.date === 1
            ? (fillupPrevMonth._min.distance || 0) - (await GetLastDistance(vehicle.id, startOfPrevMonth))
            : 0

    const distanceThisMonth = fillupThisMonth._count?.date > 1
        ? (fillupThisMonth._max.distance || 0) - (fillupThisMonth._min.distance || 0)
        : fillupThisMonth._count?.date === 1
            ? (fillupThisMonth._min.distance || 0) - (await GetLastDistance(vehicle.id, startOfThisMonth))
            : 0

    const distanceThisYear = fillupThisYear._count?.date > 1
        ? (fillupThisYear._max.distance || 0) - (fillupThisYear._min.distance || 0)
        : fillupThisYear._count?.date === 1
            ? (fillupThisYear._min.distance || 0) - (await GetLastDistance(vehicle.id, startOfThisYear))
            : 0

    const distancePrevYear = fillupLastYear._count?.date > 1
        ? (fillupLastYear._max.distance || 0) - (fillupLastYear._min.distance || 0)
        : fillupLastYear._count?.date === 1
            ? (fillupLastYear._min.distance || 0) - (await GetLastDistance(vehicle.id, startOfPrevYear))
            : 0

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

    const diffInDays = (firstFillup && lastFillup) ? differenceInDays(lastFillup?.date, firstFillup?.date) : 30
    const diffInMonths = (firstFillup && lastFillup) ? differenceInMonths(lastFillup?.date, firstFillup?.date) : 1

    const costDay = (allFillupsAggregate._sum.volume_price || 0) / diffInDays
    const costMonth = (allFillupsAggregate._sum.volume_price || 0) / diffInMonths

    const avgDistanceDay = drivenDistance > 0 ? drivenDistance / diffInDays : 0
    const avgDistanceMonth = drivenDistance > 0 ? drivenDistance / diffInMonths : 0

    const fillups = await getFillupsByVehicleId(vehicle.id)

    const distanceCostStats = calculateDistanceCostStats(fillups)

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
            costDay, // FIXME: Niet helemaal correct
            costMonth // FIXME: Niet helemaal correct
        },
        distance: {
            total: drivenDistance,
            distances: {
                last: allFillupsAggregate._max.distance || 0,
                this_year: distanceThisYear, // FIXME: Niet helemaal correct
                last_year: distancePrevYear, // FIXME: Niet helemaal correct
                this_month: distancePrevMonth,
                last_month: distanceThisMonth
            },
            avgDistanceDay, // FIXME: Niet helemaal correct
            avgDistanceMonth // FIXME: Niet helemaal correct
        }
    }
}

const GetLastDistance = async (vehicle_id: string, date: Date) => {
    const fillup = await db.fillup.findFirst({
        where: {
            vehicle_id,
            date: {
                lt: date
            }
        },
        orderBy: { date: "desc" }
    })

    return fillup?.distance || 0
}

const calculateDistanceCostStats = (fillups: FillupType) => {
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