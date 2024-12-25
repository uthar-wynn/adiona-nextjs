import { Costs } from "@prisma/client"
import { EditCostForm } from "./edit-cost-form"

interface EditCostFormWrapperProps {
    onCancel: () => void
    initialValues: Costs
}

export const EditCostFormWrapper = ({
    onCancel,
    initialValues
}: EditCostFormWrapperProps) => {

    return (
        <div>
            <EditCostForm
                initialValues={initialValues}
                onCancel={onCancel}
            />
        </div>
    )
}