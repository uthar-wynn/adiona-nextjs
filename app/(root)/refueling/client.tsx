"use client"

import GetFillupsByVehicleId, { FillupType } from "@/app/actions/fillups/getFillupsByVehicleId"
import EmptyState from "@/components/EmptyState"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useModal } from "@/hooks/use-modal-store"
import { useVehicles } from "@/hooks/use-vehicles"
import { useQuery } from "@tanstack/react-query"
import { PlusCircleIcon } from "lucide-react"
import { FuelItem } from "./_components/fuel-item"

const RefuelingClient = () => {
    const { onOpen } = useModal()
    const { selectedVehicle } = useVehicles()

    const { data, isFetching } = useQuery<FillupType>({
        queryKey: ["fillups", selectedVehicle?.id],
        queryFn: () => GetFillupsByVehicleId(selectedVehicle!.id),
        enabled: !!selectedVehicle
    })

    if (!selectedVehicle) return <EmptyState
        title="Geen gegevens gevonden"
        subtitle="Het lijkt erop dat je nog geen voertuig geselecteerd hebt."
    />

    if (isFetching) return <PageLoader />

    if (!data) return <PageError message="No data found" />

    return (
        <div className="flex flex-1 flex-col h-full gap-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">
                        Tankbeurten
                    </h1>
                    <p className="text-muted-foreground">
                        Overzicht van de tankbeurten
                    </p>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onOpen("createFillup", { selectedVehicle })}
                >
                    <PlusCircleIcon className="size-4 mr-2" />
                    Toevoegen
                </Button>
            </div>
            <Separator className="my-4" />
            <div className="h-full space-y-4">
                {Object.keys(data).map((month) => (
                    <div
                        key={month}
                        className="space-y-3"
                    >
                        <span className="text-lg font-semibold text-muted-foreground">
                            {month}
                        </span>
                        {data[month].map((fillup) => (
                            <FuelItem
                                key={fillup.id}
                                vehicle={selectedVehicle}
                                fillup={fillup}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RefuelingClient;