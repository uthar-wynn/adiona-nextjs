import { EnrichedFillup } from "@/app/actions/fillups/enrich-fillups"
import { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { currencyFilter, distanceFormatter } from "@/lib/filters"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { BadgeDollarSign, Droplet, Fuel, TrendingUp } from "lucide-react"
import { FuelItemActions } from "./fuel-item-actions"

interface FuelItemProps {
    fillup: EnrichedFillup
    vehicle: ActiveVehiclesType[number]
}

export const FuelItem = ({
    fillup,
    vehicle
}: FuelItemProps) => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-end h-4">
                        <FuelItemActions fillup={fillup} selectedVehicle={vehicle} />
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
                        <div className="bg-secondary flex size-12 shrink-0 items-center justify-center rounded-full">
                            <Fuel className="size-6" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm text-muted-foreground">
                                {format(fillup.date, "dd-MM-yyyy")}
                            </div>
                            <div className="font-semibold">
                                {currencyFilter(fillup.volume_price)}
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-right">
                                <div className="font-semibold whitespace-nowrap">
                                    {fillup.distance} km
                                </div>
                                {!fillup.isFirst && (
                                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                                        {distanceFormatter(fillup.drivenDistance)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Droplet className="size-4 shrink-0 text-cyan-600" />
                        <span>
                            {fillup.fuel} l &rarr; {fillup.unit_price} €/L
                        </span>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
                <div className="flex gap-8 items-center">
                    {!fillup.isFirst ? (
                        fillup.full ? (
                            <>
                                <div className="flex space-x-2 items-center">
                                    <TrendingUp className="size-4 text-cyan-600" />
                                    <span className={cn("font-bold",
                                        fillup.consumption < vehicle.avgConcumption && "text-green-600"
                                    )}>
                                        l/100km: {fillup.consumption.toFixed(2)}
                                    </span>
                                </div>
                                {fillup.distanceCost !== null && (
                                    <div className="flex space-x-2 items-center">
                                        <BadgeDollarSign className="size-4 text-cyan-600" />
                                        <span>
                                            € {fillup.distanceCost.toFixed(3)}/km
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex space-x-2 items-center">
                                <TrendingUp className="size-4 text-cyan-600" />
                                <span className="font-semibold">
                                    Gedeeltelijk gevuld
                                </span>
                            </div>
                        )
                    ) : (
                        <div className="flex space-x-2 items-center">
                            <TrendingUp className="size-4 text-cyan-600" />
                            <span className="font-semibold">
                                Eerste volle tank
                            </span>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}