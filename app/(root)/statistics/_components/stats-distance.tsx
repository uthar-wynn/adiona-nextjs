import { StatisticsDataType } from "@/app/actions/statistics/get-data"
import { Card, CardContent } from "@/components/ui/card"
import { numberFormatter } from "@/lib/filters"
import { CarFrontIcon, GaugeCircleIcon } from "lucide-react"

export const StatsDistance = ({ data }: { data: StatisticsDataType }) => {
    return (
        <div className="h-full pt-1 flex flex-col gap-4">
            <TotalCard data={data} />
            <LastDistanceCard data={data} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CostDayCard data={data} />
                <CostMonthCard data={data} />
            </div>
        </div>
    )
}

const TotalCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Afgelegde afstand met Adiona
                    </span>
                    <h2 className="text-2xl font-bold">
                        {data.distance.total} km
                    </h2>
                </div>
            </CardContent>
        </Card>
    )
}

const LastDistanceCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Laatste kilometerstand
                    </span>
                    <h2 className="text-2xl font-bold">
                        {data.distance.distances.last} km
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <GaugeCircleIcon className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.distance.distances.this_year} km
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Dit jaar
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.distance.distances.last_year} km
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Vorig jaar
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <GaugeCircleIcon className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.distance.distances.this_month} km
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Deze maand
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.distance.distances.last_month} km
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Vorige maand
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const CostDayCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Gemiddeld aantal kilometers per dag
                    </span>
                    <div className="flex space-x-4 items-center">
                        <CarFrontIcon className="size-4 text-cyan-600" />
                        <span>
                            {numberFormatter(data.distance.avgDistanceDay)} km
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const CostMonthCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Gemiddeld aantal kilometers per maand
                    </span>
                    <div className="flex space-x-4 items-center">
                        <CarFrontIcon className="size-4 text-cyan-600" />
                        <span>
                            {numberFormatter(data.distance.avgDistanceMonth)} km
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}