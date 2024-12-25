"use client"

import { GetStatisticsData, StatisticsDataType } from "@/app/actions/statistics/get-data";
import EmptyState from "@/components/EmptyState";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVehicles } from "@/hooks/use-vehicles";
import { useQuery } from "@tanstack/react-query";
import { StatsCosts } from "./_components/stats-costs";
import { StatsDistance } from "./_components/stats-distance";
import { StatsFuel } from "./_components/stats-fuel";

const StatisticstClient = () => {
    const { selectedVehicle } = useVehicles()

    const { data, isFetching } = useQuery<StatisticsDataType>({
        queryKey: ["statistics", selectedVehicle?.id],
        queryFn: () => GetStatisticsData(selectedVehicle!.id),
        enabled: !!selectedVehicle
    })

    if (!selectedVehicle) return <EmptyState
        title="Geen gegevens gevonden"
        subtitle="Het lijkt erop dat je nog geen voertuig geselecteerd hebt."
    />

    if (isFetching) return <PageLoader />

    if (!data) return <PageError message="No data found" />

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold ">
                    Statistieken
                </h1>
            </div>
            <div className="h-full py-6 items-center w-full">
                <Tabs defaultValue="fuel">
                    <TabsList className="w-full">
                        <TabsTrigger value="fuel" className="w-full">Tankbeurten</TabsTrigger>
                        <TabsTrigger value="cost" className="w-full">Kosten</TabsTrigger>
                        <TabsTrigger value="distance" className="w-full">Afstand</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fuel">
                        <StatsFuel
                            data={data}
                        />
                    </TabsContent>
                    <TabsContent value="cost">
                        <StatsCosts
                            data={data}
                        />
                    </TabsContent>
                    <TabsContent value="distance">
                        <StatsDistance
                            data={data}
                        />
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}

export default StatisticstClient;