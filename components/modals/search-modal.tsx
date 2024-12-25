"use client"

import { useModal } from "@/hooks/use-modal-store";
import { useVehicles } from "@/hooks/use-vehicles";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const SearchModal = () => {
    const { isOpen, onClose, type } = useModal()

    const isModalOpen = isOpen && type === "search"

    const { vehicles, selectedVehicle, setSelectedVehicleId } = useVehicles()

    const handleClose = () => {
        onClose()
    }

    const handleSelectionChanged = (value: string) => {
        setSelectedVehicleId(value)
        handleClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Selecteer voertuig
                    </DialogTitle>
                </DialogHeader>
                <Select
                    onValueChange={(value) => handleSelectionChanged(value)}
                    defaultValue={selectedVehicle?.id}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecteer voertuig" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {vehicles?.map((vehicle) => (
                                <SelectItem
                                    key={vehicle.id}
                                    value={vehicle.id}
                                >
                                    {vehicle.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </DialogContent>
        </Dialog>
    );
}

export default SearchModal;