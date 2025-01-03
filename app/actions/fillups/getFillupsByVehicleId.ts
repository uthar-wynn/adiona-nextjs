"use server"

import db from "@/lib/db"
import { format } from "date-fns"
import { EnrichedFillup, EnrichFillups } from "./enrich-fillups"

export type FillupType = Awaited<ReturnType<typeof GetFillupsByVehicleId>>

export default async function GetFillupsByVehicleId(id: string) {
    const fillUps = await db.fillup.findMany({
        where: {
            vehicle_id: id
        },
        orderBy: {
            date: 'desc'
        }
    })

    const enrichedFillups = EnrichFillups(fillUps)

    const groupedFillups = GroupFillupsByMonth(enrichedFillups)

    return groupedFillups
}

export const GroupFillupsByMonth = (fillups: EnrichedFillup[]): Record<string, EnrichedFillup[]> => {
    return fillups.reduce<Record<string, EnrichedFillup[]>>(
        (groups, fillup) => {
            const monthKey = format(fillup.date, "MMMM yyyy")
            if (!groups[monthKey]) groups[monthKey] = []
            groups[monthKey].push(fillup)

            return groups
        },
        {}
    )
}