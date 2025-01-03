"use client"

import { useEffect, useState } from "react"
import { CreateCostModal } from "../modals/costs/create-cost-modal"
import { EditCostModal } from "../modals/costs/edit-cost-modal"
import { CreateFillupModal } from "../modals/fillups/create-fillup-modal"
import { EditFillupModal } from "../modals/fillups/edit-fillup-modal"
import { CreateVehicleModal } from "../modals/vehicles/create-vehicle-modal"
import { EditVehicleModal } from "../modals/vehicles/edit-vehicle-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <CreateVehicleModal />
            <EditVehicleModal />
            <CreateFillupModal />
            <EditFillupModal />
            <CreateCostModal />
            <EditCostModal />
        </>
    )
}