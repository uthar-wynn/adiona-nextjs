"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ResponsiveModal } from "../responsive-modal"
import { EditVehicleFormWrapper } from "./edit-vehicle-form-wrapper"

export const EditVehicleModal = () => {
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === "editVehicle"
    const { vehicle } = data

    return (
        <ResponsiveModal
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <EditVehicleFormWrapper
                initialValues={vehicle!}
                onCancel={onClose}
            />
        </ResponsiveModal>
    )
}