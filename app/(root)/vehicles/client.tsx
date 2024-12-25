"use client"

import EmptyState from "@/components/EmptyState";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { Vehicle } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { VehicleCard } from "./_components/vehicle-card";

const VehiclesClient = () => {
    const { onOpen } = useModal()

    const { data, isFetching } = useQuery<Vehicle[]>({
        queryKey: ["vehicles"],
        queryFn: () => axios.get("/api/vehicles").then(res => res.data)
    })

    if (isFetching) return <PageLoader />

    if (!data) return <PageError message="No data found" />

    return (
        <div className="flex flex-1 flex-col h-full gap-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">
                        Voertuigen
                    </h1>
                    <p className="text-muted-foreground">
                        Overzicht van al je voertuigen
                    </p>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onOpen("createVehicle")}
                >
                    <PlusCircleIcon className="size-4 mr-2" />
                    Toevoegen
                </Button>
            </div>
            <div className="flex items-center"> </div>
            <Separator className="my-4" />
            <div className="h-full space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {data.length > 0 ? (
                        data.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VehiclesClient;