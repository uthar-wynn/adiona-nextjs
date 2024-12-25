"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ResponsiveModal } from "../responsive-modal"
import { EditCostFormWrapper } from "./edit-cost-form-wrapper"

export const EditCostModal = () => {
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === "editCost"
    const { cost } = data

    return (
        <ResponsiveModal
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <EditCostFormWrapper
                initialValues={cost!}
                onCancel={onClose}
            />
        </ResponsiveModal>
    )
}