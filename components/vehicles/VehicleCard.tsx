"use client"

import { ModalType, useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Vehicle } from "@prisma/client";
import { CarFront } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface VehicleCardProps {
    vehicle: Vehicle
}

const VehicleCard = ({
    vehicle
}: VehicleCardProps) => {
    const { onOpen } = useModal()

    const onAction = (event: React.MouseEvent, action: ModalType) => {
        event.stopPropagation()
        onOpen(action, { vehicle })
    }

    return (
        <Card onClick={(e) => onAction(e, "editVehicle")}>
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row space-x-2">
                        <CarFront className={cn(
                            "mr-2",
                            vehicle.enabled ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                        )} />
                        {vehicle.name}
                    </div>
                </CardTitle>
                <CardDescription>
                    {vehicle.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {vehicle.make}
                </div>
                <div>
                    {vehicle.model}
                </div>
                <div className="capitalize">
                    {vehicle.fuel_type.toLocaleLowerCase()}
                </div>
                <div>
                    {vehicle.year}
                </div>
            </CardContent>
        </Card>
    );
}

export default VehicleCard;