"use client"

import { DashboardDataType, GetDashboardData } from "@/app/actions/dashboard/get-data";
import EmptyState from "@/components/EmptyState";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useVehicles } from "@/hooks/use-vehicles";
import { useQuery } from "@tanstack/react-query";
import { CardCosts } from "./_components/card-costs";
import { CardFuel } from "./_components/card-fuel";
import { CardLastInput } from "./_components/card-last-input";

const DashboardClient = () => {
    const { selectedVehicle } = useVehicles()

    const { data, isFetching } = useQuery<DashboardDataType>({
        queryKey: ["dashboard", selectedVehicle?.id],
        queryFn: () => GetDashboardData(selectedVehicle!.id),
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
                <h1 className="text-3xl font-bold ">
                    Dashboard
                </h1>
            </div>
            <div className="h-full py-6 flex flex-col gap-4 items-center">
                <CardFuel
                    data={data}
                />
                <CardCosts
                    data={data}
                />
                <CardLastInput
                    data={data}
                />
            </div>
        </div>
    );
}

export default DashboardClient;