import { Vehicle } from "@prisma/client"
import { EditVehicleForm } from "./edit-vehicle-form"

interface EditVehicleFormWrapperProps {
    onCancel: () => void
    initialValues: Vehicle
}

export const EditVehicleFormWrapper = ({
    onCancel,
    initialValues
}: EditVehicleFormWrapperProps) => {

    return (
        <div>
            <EditVehicleForm
                initialValues={initialValues}
                onCancel={onCancel}
            />
        </div>
    )
}