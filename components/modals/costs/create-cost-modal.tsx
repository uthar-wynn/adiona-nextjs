"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ResponsiveModal } from "../responsive-modal"
import { CreateCostFormWrapper } from "./create-cost-form-wrapper"

export const CreateCostModal = () => {
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === "createCost"
    const { selectedVehicle } = data

    return (
        <ResponsiveModal
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <CreateCostFormWrapper
                onCancel={onClose}
                selectedVehicle={selectedVehicle!}
            />
        </ResponsiveModal>
    )
}