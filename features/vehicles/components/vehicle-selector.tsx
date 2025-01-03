"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVehicles } from "@/hooks/use-vehicles"

export const VehicleSelector = () => {
    const { vehicles, selectedVehicle, setSelectedVehicleId } = useVehicles()

    return (
        <Select
            onValueChange={(value) => setSelectedVehicleId(value)}
            value={selectedVehicle?.id}
        >
            <SelectTrigger className="flex p-4 min-h-16">
                <SelectValue placeholder="Selecteer voertuig" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {vehicles?.map((vehicle) => (
                        <SelectItem
                            key={vehicle.id}
                            value={vehicle.id}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex justify-center items-center size-10 bg-secondary rounded-full text-xl">
                                    {vehicle.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {vehicle.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {vehicle.lastDistance} km
                                    </p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}