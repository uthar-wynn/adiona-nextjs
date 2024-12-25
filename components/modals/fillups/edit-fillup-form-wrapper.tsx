"use client"

import { Fillup } from "@prisma/client"
import { EditFillupForm } from "./edit-fillup-form"

interface Props {
    onCancel: () => void
    initialValues: Fillup
}

export const EditFillupFormWrapper = ({
    onCancel,
    initialValues
}: Props) => {
    return (
        <div>
            <EditFillupForm
                onCancel={onCancel}
                initialValues={initialValues}
            />
        </div>
    )
}