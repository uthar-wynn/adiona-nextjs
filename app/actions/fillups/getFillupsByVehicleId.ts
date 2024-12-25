"use server"

import db from "@/lib/db"

export type FillupType = Awaited<ReturnType<typeof getFillupsByVehicleId>>

export default async function getFillupsByVehicleId(id: string) {
    const fillUps = await db.fillup.findMany({
        where: {
            vehicle_id: id
        },
        orderBy: {
            date: 'desc'
        }
    })

    const enrichedFillups = fillUps.map((fillup, index) => {
        const nextFillup = fillUps[index + 1]

        const drivenDistance = nextFillup ? fillup.distance - nextFillup.distance : 0
        const distanceCost = drivenDistance > 0 ? fillup.volume_price / drivenDistance : null

        return {
            ...fillup,
            drivenDistance,
            distanceCost,
            isFirst: index === fillUps.length - 1
        }
    })

    return enrichedFillups
}