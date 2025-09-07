import { StatisticsDataType } from "@/app/actions/statistics/get-data"
import { Card, CardContent } from "@/components/ui/card"
import { currencyFilter } from "@/lib/filters"
import { BadgeDollarSignIcon, FuelIcon, MoveRightIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

export const StatsCosts = ({ data }: { data: StatisticsDataType }) => {
    return (
        <div className="h-full pt-1 flex flex-col gap-4">
            <TotalCard data={data} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <BillingCard data={data} />
                <FuelPriceCard data={data} />
            </div>
            <AverageCostCard data={data} />
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
                        Kosten
                    </span>
                    <h2 className="text-2xl font-bold">
                        {currencyFilter(data.cost.costs.total)}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                {data.cost.costs.this_year === data.cost.costs.last_year ? (
                                    <MoveRightIcon className="size-4 text-neutral-600" />
                                ) : (
                                    <>
                                        {data.cost.costs.this_year < data.cost.costs.last_year ? (
                                            <TrendingDownIcon className="size-4 text-emerald-600" />
                                        ) : (
                                            <TrendingUpIcon className="size-4 text-rose-600" />
                                        )}
                                    </>
                                )}
                                <div className="flex flex-col">
                                    <span>
                                        {currencyFilter(data.cost.costs.this_year)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Dit jaar</span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {currencyFilter(data.cost.costs.last_year)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Vorig jaar</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex space-x-4 items-center">
                                {data.cost.costs.this_month === data.cost.costs.last_month ? (
                                    <MoveRightIcon className="size-4 text-neutral-600" />
                                ) : (
                                    <>
                                        {data.cost.costs.this_month < data.cost.costs.last_month ? (
                                            <TrendingDownIcon className="size-4 text-emerald-600" />
                                        ) : (
                                            <TrendingUpIcon className="size-4 text-rose-600" />
                                        )}
                                    </>
                                )}
                                <div className="flex flex-col">
                                    <span>
                                        {currencyFilter(data.cost.costs.this_month)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Deze maand</span>
                                </div>
                            </div>
                            <div className="flex space-x-5 items-center">
                                <div className="size-4" />
                                <div className="flex flex-col">
                                    <span>
                                        {currencyFilter(data.cost.costs.last_month)}
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

const BillingCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Rekeningen
                    </span>
                    <div className="flex flex-col gap-2">
                        <div className="flex space-x-4 items-center">
                            <BadgeDollarSignIcon className="size-4 text-emerald-600" />
                            <div className="flex flex-col">
                                <span>
                                    {currencyFilter(data.cost.billing.min)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Laagste rekeningbedrag
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-5 items-center">
                            <BadgeDollarSignIcon className="size-4 text-rose-600" />
                            <div className="flex flex-col">
                                <span>
                                    {currencyFilter(data.cost.billing.max)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Hoogste rekeningbedrag
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const FuelPriceCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Brandstofprijs
                    </span>
                    <div className="flex flex-col gap-2">
                        <div className="flex space-x-4 items-center">
                            <FuelIcon className="size-4 text-emerald-600" />
                            <div className="flex flex-col">
                                <span>
                                    {currencyFilter(data.cost.fuel_price.min, 3)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Laagste prijs
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-5 items-center">
                            <FuelIcon className="size-4 text-rose-600" />
                            <div className="flex flex-col">
                                <span>
                                    {currencyFilter(data.cost.fuel_price.max, 3)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Hoogste prijs
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const AverageCostCard = ({ data }: { data: StatisticsDataType }) => {
    return (
        <Card className="p-2 lg:p-4">
            <CardContent>
                <div className="flex flex-col gap-2">
                    <span className="text-lg text-muted-foreground">
                        Gemiddelde kosten per kilometer
                    </span>
                    <h2 className="text-2xl font-bold">
                        {currencyFilter(data.cost.avg_cost.total, 3)} /km
                    </h2>
                    <div className="grid grid-cols-2 items gap-4 mt-4">
                        <div className="flex space-x-4 items-center">
                            <BadgeDollarSignIcon className="size-4 text-emerald-600" />
                            <div className="flex flex-col">
                                <span>
                                    {currencyFilter(data.cost.avg_cost.min, 3)} /km
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Laagste kosten per kilometer
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <BadgeDollarSignIcon className="size-4 text-rose-600" />
                            <div className="flex flex-col">
                                <span>
                                    {currencyFilter(data.cost.avg_cost.max, 3)} /km
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Ongunstigste kosten per kilometer
                                </span>
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
                        Kosten per dag
                    </span>
                    <div className="flex space-x-4 items-center">
                        <BadgeDollarSignIcon className="size-4 text-cyan-600" />
                        <span>
                            {currencyFilter(data.cost.costDay)}
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
                        Kosten per maand
                    </span>
                    <div className="flex space-x-4 items-center">
                        <BadgeDollarSignIcon className="size-4 text-cyan-600" />
                        <span>
                            {currencyFilter(data.cost.costMonth)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}