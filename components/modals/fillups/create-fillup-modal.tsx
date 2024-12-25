"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ResponsiveModal } from "../responsive-modal"
import { CreateFillupFormWrapper } from "./create-fillup-form-wrapper"

export const CreateFillupModal = () => {
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === "createFillup"
    const { selectedVehicle } = data

    return (
        <ResponsiveModal
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <CreateFillupFormWrapper
                onCancel={onClose}
                selectedVehicle={selectedVehicle!}
            />
        </ResponsiveModal>
    )
}