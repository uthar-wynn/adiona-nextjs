import { StatisticsDataType } from "@/app/actions/statistics/get-data"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { numberFormatter } from "@/lib/filters"
import { ArrowDownToLine, ArrowUpToLine, DropletIcon, FuelIcon } from "lucide-react"

export const StatsFuel = ({ data }: { data: StatisticsDataType }) => {
    return (
        <div className="h-full pt-1 flex flex-col gap-4">
            <FillupsCard
                data={data}
            />
            <FuelCard
                data={data}
            />
            <AverageCard
                data={data}
            />
        </div>
    )
}

const FillupsCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Tankbeurten
                    </span>
                    <h2 className="text-2xl font-bold">
                        {data.fuel.fillups.total}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <FuelIcon className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.fuel.fillups.this_year}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Dit jaar</span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.fuel.fillups.last_year}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Vorig jaar</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <FuelIcon className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.fuel.fillups.this_month}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Deze maand</span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {data.fuel.fillups.last_month}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Vorige maand</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const FuelCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Brandstof
                    </span>
                    <h2 className="text-2xl font-bold">
                        {numberFormatter(data.fuel.fuel.sum)} l
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <DropletIcon className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.fuel.this_year)} l
                                    </span>
                                    <span className="text-sm text-muted-foreground">Dit jaar</span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.fuel.last_year)} l
                                    </span>
                                    <span className="text-sm text-muted-foreground">Vorig jaar</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <DropletIcon className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.fuel.this_month)} l
                                    </span>
                                    <span className="text-sm text-muted-foreground">Deze maand</span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.fuel.last_month)} l
                                    </span>
                                    <span className="text-sm text-muted-foreground">Vorige maand</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 items gap-4 ">
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <ArrowDownToLine className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.fuel.min)} l
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Minimale tankbeurt
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <ArrowUpToLine className="size-4 text-cyan-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.fuel.max)} l
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Maximale tankbeurt
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

const AverageCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Gemiddeld verbuik
                    </span>
                    <h2 className="text-2xl font-bold">
                        {numberFormatter(data.fuel.average.avg)} l/100km
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <DropletIcon className="size-4 text-green-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.average.min)} l/100km
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Meest zuinige verbruik
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                <DropletIcon className="size-4 text-rose-600" />
                                <div className="flex flex-col">
                                    <span>
                                        {numberFormatter(data.fuel.average.max)} l/100km
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Minst zuinige verbruik
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