"use client"

import { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { CreateFillupForm } from "./create-fillup-form"

interface Props {
    onCancel: () => void
    selectedVehicle: ActiveVehiclesType[number]
}

export const CreateFillupFormWrapper = ({
    onCancel,
    selectedVehicle
}: Props) => {
    return (
        <div>
            <CreateFillupForm
                onCancel={onCancel}
                selectedVehicle={selectedVehicle}
            />
        </div>
    )
}