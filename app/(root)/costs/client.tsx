"use client"

import getCostsByVehicleId, { CostType } from "@/app/actions/costs/getCostsByVehicleId";
import EmptyState from "@/components/EmptyState";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { useVehicles } from "@/hooks/use-vehicles";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon } from "lucide-react";
import { CostItem } from "./_components/cost-item";

const CostsClient = () => {
    const { onOpen } = useModal()
    const { selectedVehicle } = useVehicles()

    const { data, isFetching } = useQuery<CostType>({
        queryKey: ["costs", selectedVehicle?.id],
        queryFn: () => getCostsByVehicleId(selectedVehicle!.id),
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
                        Kosten
                    </h1>
                    <p className="text-muted-foreground">
                        Overzicht van de voertuig kosten
                    </p>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onOpen("createCost", { selectedVehicle })}
                >
                    <PlusCircleIcon className="size-4 mr-2" />
                    Toevoegen
                </Button>
            </div>
            <Separator className="my-4" />
            <div className="h-full space-y-4">
                <div className="flex flex-col gap-4">
                    {data.length > 0
                        ? (data.map((cost) => (
                            <CostItem
                                key={cost.id}
                                cost={cost}
                            />
                        ))
                        ) : (
                            <EmptyState
                                title="Er zijn geen kosten gevonden voor dit voertuig"
                                subtitle="Voeg een kost toe"
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default CostsClient;