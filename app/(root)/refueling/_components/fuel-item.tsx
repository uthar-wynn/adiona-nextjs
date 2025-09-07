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
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-6 items-center">
                            <div className="bg-secondary size-12 rounded-full flex items-center justify-center">
                                <Fuel className="size-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">
                                    {format(fillup.date, "dd-MM-yyyy")}
                                </span>
                                <span>
                                    {currencyFilter(fillup.volume_price)}
                                </span>
                            </div>
                        </div>
                        <span className="flex space-x-4 items-center">
                            <Droplet className="size-4 text-cyan-600" />
                            <p>
                                {fillup.fuel} l &rarr; {fillup.unit_price} €/L
                            </p>
                        </span>
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex flex-col">
                            <span>
                                {fillup.distance} km
                            </span>
                            {!fillup.isFirst && (
                                <span className="text-sm text-muted-foreground">
                                    {distanceFormatter(fillup.drivenDistance)}
                                </span>
                            )}
                        </div>
                        <FuelItemActions fillup={fillup} />
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
                <div className="flex space-x-8 items-center">
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