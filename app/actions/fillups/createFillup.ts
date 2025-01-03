"use server"

import { fillupSchemaType } from "@/features/fillups/schemas"
import db from "@/lib/db"

export default async function CreateFillup({ data }: { data: fillupSchemaType }) {
    try {
        const {
            vehicle_id,
            counter,
            date,
            distance,
            fuel,
            full,
            unit_price,
            volume_price
        } = data

        const lastFillup = await db.fillup.findFirst({
            where: {
                vehicle_id,
                date: {
                    lt: date
                }
            },
            orderBy: { date: "desc" }
        })

        let lastDistanceValue = lastFillup?.distance ? (distance - lastFillup?.distance) : 0
        let calculatedConsumption = 0
        let newDistance = distance
        let newFullValue = full

        if (counter === "Dagteller") {
            calculatedConsumption = fuel / distance * 100
            lastDistanceValue += distance
        } else if (counter === "Kilometerteller") {
            if (lastDistanceValue === 0) {
                calculatedConsumption = 0
                newFullValue = false
            } else
                calculatedConsumption = (fuel / lastDistanceValue) * 100
        }

        const fillup = await db.fillup.create({
            data: {
                vehicle_id,
                date,
                distance: newDistance,
                fuel,
                full: newFullValue,
                unit_price,
                consumption: calculatedConsumption,
                volume_price
            }
        })

        return fillup

    } catch (error: any) {
        throw new Error(`Failed to update fillup: ${error.message}`);
    }
}