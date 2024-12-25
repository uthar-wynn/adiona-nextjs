"use client"

import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal-store"
import { useVehicles } from "@/hooks/use-vehicles"
import { CarFront } from "lucide-react"

export const VehicleButton = () => {
    const { selectedVehicle } = useVehicles()
    const { onOpen } = useModal()

    return (
        <Button
            className="w-full space-x-2 items-center"
            onClick={() => onOpen("search")}
        >
            {selectedVehicle ? (
                <div className="flex">
                    <CarFront className="mr-2 size-5" />
                    <span className="font-semibold">
                        {selectedVehicle.name}
                    </span>
                </div>
            ) : (
                <div className="flex">
                    <CarFront className="mr-2 size-5" />
                    <span className="font-semibold">
                        Selecteer voertuig
                    </span>
                </div>
            )}
        </Button>
    )
}