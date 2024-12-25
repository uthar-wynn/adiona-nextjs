import { DashboardDataType } from "@/app/actions/dashboard/get-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { numberFormatter } from "@/lib/filters"
import { differenceInDays, format } from "date-fns"
import { Droplet, FuelIcon, TrendingDownIcon } from "lucide-react"

export const CardFuel = ({ data }: { data: DashboardDataType }) => {
    return (
        <div className="flex flex-col gap-4">
            <Badge variant="outline">
                <FuelIcon className="size-4 mr-1 text-cyan-600" />
                Brandstof
            </Badge>
            <Card className="min-w-[400px]">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                        <span className="lowercase text-muted-foreground">
                            {data.vehicle.fuel_type}
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                                <Droplet className="mr-2 size-4 text-cyan-600" />
                                {numberFormatter(data.vehicle?.avgConcumption || 0)}
                                <p className="text-muted-foreground">l/100km</p>
                            </span>
                            <span className="text-right text-muted-foreground">
                                Gemiddeld verbruik
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                                <TrendingDownIcon className="mr-2 size-4 text-cyan-600" />
                                {numberFormatter(data.lastFillup?.consumption || 0)}
                                <p className="text-muted-foreground">l/100km</p>
                            </span>
                            <span className="text-right text-muted-foreground">
                                Laatste verbruik
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                <TrendingDownIcon className="mr-2 size-4 text-cyan-600" />
                                € {data.lastFillup?.unit_price.toFixed(3)}
                            </span>
                            <span className="text-right text-muted-foreground">
                                Laatste brandstofprijs
                            </span>
                        </div>
                        <div className="flex items-center justify-end">
                            {data.lastFillup?.date && (
                                <span className="text-sm text-muted-foreground">
                                    {format(data.lastFillup?.date, "dd-MM-yyyy")} ·&nbsp;
                                    {differenceInDays(new Date(), data.lastFillup?.date!)} dagen geleden
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}