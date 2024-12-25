import getActiveVehicles, { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { useVehicleStore } from "@/store/vehicle-store"
import { useQuery } from "@tanstack/react-query"

export const useVehicles = () => {
    const { data: vehicles } = useQuery<ActiveVehiclesType>({
        queryKey: ["active-vehicles"],
        queryFn: () => getActiveVehicles()
    })

    const { selectedVehicleId, setSelectedVehicleId } = useVehicleStore()

    const selectedVehicle = vehicles && vehicles.length > 0
        ? vehicles?.find((vehicle) => vehicle.id === selectedVehicleId) || vehicles[0]
        : null

    if (!selectedVehicleId && selectedVehicle) setSelectedVehicleId(selectedVehicle.id)

    return {
        vehicles,
        selectedVehicle,
        setSelectedVehicleId
    }
}