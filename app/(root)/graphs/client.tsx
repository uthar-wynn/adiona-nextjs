"use client"

import { GetGraphData, GraphDataType } from "@/app/actions/graphs/get-graph-data";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVehicles } from "@/hooks/use-vehicles";
import { useQuery } from "@tanstack/react-query";
import { ChartCostFuel } from "./_components/chart-cost-fuel";
import { ChartCostMonth } from "./_components/chart-cost-month";
import { ChartFuelPrice } from "./_components/chart-fuel-price";
import { ChartFuelUsage } from "./_components/chart-fuel-usage";
import { ChartMonthlyDistance } from "./_components/chart-monthly-distance";
import { ChartTotalDistance } from "./_components/chart-total-distance";

const GraphsClient = () => {
    const { selectedVehicle } = useVehicles()

    const { data, isFetching } = useQuery<GraphDataType>({
        queryKey: ["chart-data", selectedVehicle?.id],
        queryFn: () => GetGraphData(selectedVehicle!.id),
        enabled: !!selectedVehicle
    })

    if (isFetching) return <PageLoader />

    if (!data) return <PageError message="No data found" />

    return (
        <div className="flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold ">
                    Grafieken
                </h1>
            </div>
            <div className="h-full py-6 items-center w-full">
                <Tabs defaultValue="fuel-usage">
                    <div className="w-full overflow-x-auto">
                        <TabsList className="inline-flex min-w-max">
                            <TabsTrigger value="fuel-usage">
                                Brandstofverbruik
                            </TabsTrigger>
                            <TabsTrigger value="cost-month">
                                Maandelijkse kosten
                            </TabsTrigger>
                            <TabsTrigger value="fuel-price">
                                Brandstofprijs
                            </TabsTrigger>
                            <TabsTrigger value="cost-fuel">
                                Kosten tankbeurt
                            </TabsTrigger>
                            <TabsTrigger value="total-distance">
                                Totaal kilometerteller
                            </TabsTrigger>
                            <TabsTrigger value="monthly-distance">
                                Maandelijks afgelegde afstand
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="fuel-usage">
                        <ChartFuelUsage data={data} />
                    </TabsContent>
                    <TabsContent value="cost-month">
                        <ChartCostMonth data={data} />
                    </TabsContent>
                    <TabsContent value="fuel-price">
                        <ChartFuelPrice data={data} />
                    </TabsContent>
                    <TabsContent value="cost-fuel">
                        <ChartCostFuel data={data} />
                    </TabsContent>
                    <TabsContent value="total-distance">
                        <ChartTotalDistance data={data} />
                    </TabsContent>
                    <TabsContent value="monthly-distance">
                        <ChartMonthlyDistance data={data} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default GraphsClient;