import { create } from "zustand";

interface VehicleStore {
    selectedVehicleId: string | null;
    setSelectedVehicleId: (id: string) => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({

    selectedVehicleId: null,
    setSelectedVehicleId: (id) => set({ selectedVehicleId: id }),
}));
