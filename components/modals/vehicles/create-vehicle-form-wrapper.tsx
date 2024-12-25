import { CreateVehicleForm } from "./create-vehicle-form"

export const CreateVehicleFormWrapper = ({ onCancel }: { onCancel: () => void }) => {

    return (
        <div>
            <CreateVehicleForm onCancel={onCancel} />
        </div>
    )
}