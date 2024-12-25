import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export default async function getVehicleById(vehicleId: string) {
    const { userId } = await auth()

    if (!userId) return null


    if (!userId) return null

    const vehicle = await db.vehicle.findUnique({
        where: {
            id: vehicleId,
            user_id: userId
        }
    })

    return vehicle
}