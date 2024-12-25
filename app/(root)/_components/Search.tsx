"use client"

import { useModal } from "@/hooks/use-modal-store";
import { Vehicle } from "@prisma/client";
import { CarFront } from "lucide-react";
import { useMemo } from "react";

interface SearchProps {
    vehicles: Vehicle[]
    vehicle?: Vehicle
}

const Search = ({
    vehicles,
    vehicle
}: SearchProps) => {
    const { onOpen } = useModal()

    const vehicleLabel = useMemo(() => {
        if (vehicle?.name) return vehicle.name

        return "Selecteer voertuig"
    }, [vehicle])

    const plateLabel = useMemo(() => {
        if (vehicle?.plate) return vehicle.plate

        return "Plaat"
    }, [vehicle])

    const fuelTypeLabel = useMemo(() => {
        if (vehicle?.fuel_type) return vehicle.fuel_type

        return "Brandstof type"
    }, [vehicle])

    return (
        <div
            onClick={() => onOpen("search", { vehicles: vehicles, vehicle: vehicle })}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-sm transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {vehicleLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 flex-1 text-center border-x-[1px]">
                    {plateLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 dark:text-gray-400 flex flex-row items-center gap-3">
                    <div className="hidden sm:block capitalize">
                        {fuelTypeLabel.toLocaleLowerCase()}
                    </div>
                    <div className="p-2 bg-blue-600 dark:bg-blue-400 rounded-full text-white">
                        <CarFront size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;