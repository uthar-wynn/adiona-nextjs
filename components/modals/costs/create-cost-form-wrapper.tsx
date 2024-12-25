import { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { CreateCostForm } from "./create-cost-form"

interface Props {
    onCancel: () => void
    selectedVehicle: ActiveVehiclesType[number]
}

export const CreateCostFormWrapper = ({
    onCancel,
    selectedVehicle
}: Props) => {

    return (
        <div>
            <CreateCostForm
                onCancel={onCancel}
                selectedVehicle={selectedVehicle}
            />
        </div>
    )
}