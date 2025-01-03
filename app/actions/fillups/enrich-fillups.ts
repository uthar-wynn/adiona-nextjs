import { Fillup } from "@prisma/client";

export type EnrichedFillup = Fillup & {
    drivenDistance: number
    distanceCost: number | null
    isFirst: boolean
}

export const EnrichFillups = (fillUps: Fillup[]): EnrichedFillup[] => {
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