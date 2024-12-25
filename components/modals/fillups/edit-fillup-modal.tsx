"use client"

import { useModal } from "@/hooks/use-modal-store"
import { ResponsiveModal } from "../responsive-modal"
import { EditFillupFormWrapper } from "./edit-fillup-form-wrapper"

export const EditFillupModal = () => {
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === "editFillup"
    const { fillup } = data

    return (
        <ResponsiveModal
            open={isModalOpen}
            onOpenChange={onClose}
        >
            <EditFillupFormWrapper
                onCancel={onClose}
                initialValues={fillup!}
            />
        </ResponsiveModal>
    )
}