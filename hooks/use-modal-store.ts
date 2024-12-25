import { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { Costs, Fillup, Vehicle } from "@prisma/client"
import { create } from "zustand"

export type ModalType = "createVehicle" | "editVehicle" | "search" | "createFillup" | "editFillup" | "createCost" | "editCost"

interface ModalData {
    vehicle?: Vehicle
    vehicles?: Vehicle[]
    fillup?: Fillup
    lastFillup?: Fillup
    selectedVehicle?: ActiveVehiclesType[number]
    cost?: Costs
}

interface ModalStore {
    type: ModalType | null
    data: ModalData
    isOpen: boolean
    onOpen: (type: ModalType, data?: ModalData) => void
    onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}))