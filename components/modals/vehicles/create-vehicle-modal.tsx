"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ResponsiveModal } from "../responsive-modal"
import { CreateVehicleFormWrapper } from "./create-vehicle-form-wrapper"

export const CreateVehicleModal = () => {
    const { isOpen, onClose, type } = useModal()

    const isModalOpen = isOpen && type === "createVehicle"

    return (
        <ResponsiveModal
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <CreateVehicleFormWrapper
                onCancel={onClose}
            />
        </ResponsiveModal>
    )
}