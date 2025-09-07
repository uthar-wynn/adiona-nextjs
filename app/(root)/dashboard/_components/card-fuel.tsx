import { DashboardDataType } from "@/app/actions/dashboard/get-data"
import { badgeVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { numberFormatter } from "@/lib/filters"
import { differenceInDays, format } from "date-fns"
import { ArrowRightIcon, Droplet, FuelIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import Link from "next/link"

export const CardFuel = ({ data }: { data: DashboardDataType }) => {
    const last = data.lastFillup?.unit_price || 0
    const prev = data.prevFillup?.unit_price || 0

    return (
        <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" asChild>
                <Link
                    href="/refueling"
                    className={badgeVariants({ variant: "outline" })}
                >
                    <FuelIcon className="size-4 mr-1 text-cyan-600" />
                    Brandstof
                </Link>
            </Button>
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
                                {((data.vehicle?.avgConcumption || 0) < (data.lastFillup?.consumption || 0)) ? (
                                    <TrendingUpIcon className="mr-2 size-4 text-rose-600" />
                                ) : (
                                    <TrendingDownIcon className="mr-2 size-4 text-emerald-600" />
                                )}
                                {numberFormatter(data.lastFillup?.consumption || 0)}
                                <p className="text-muted-foreground">l/100km</p>
                            </span>
                            <span className="text-right text-muted-foreground">
                                Laatste verbruik
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                {Math.abs(last - prev) < 0.0005 ? (
                                    <ArrowRightIcon className="mr-2 size-4 text-cyan-600" />
                                ) : last > prev ? (
                                    <TrendingUpIcon className="mr-2 size-4 text-rose-600" />
                                ) : (
                                    <TrendingDownIcon className="mr-2 size-4 text-emerald-600" />
                                )}
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