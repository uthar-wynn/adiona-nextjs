"use client"

import { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { Fillup } from "@prisma/client"
import { EditFillupForm } from "./edit-fillup-form"

interface Props {
    onCancel: () => void
    selectedVehicle: ActiveVehiclesType[number]
    initialValues: Fillup
}

export const EditFillupFormWrapper = ({
    onCancel,
    selectedVehicle,
    initialValues
}: Props) => {
    return (
        <div>
            <EditFillupForm
                onCancel={onCancel}
                selectedVehicle={selectedVehicle}
                initialValues={initialValues}
            />
        </div>
    )
}