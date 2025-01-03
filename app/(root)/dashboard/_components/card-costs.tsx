import { DashboardDataType } from "@/app/actions/dashboard/get-data"
import { badgeVariants } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { currencyFilter } from "@/lib/filters"
import { BadgeDollarSign, FuelIcon, TicketIcon } from "lucide-react"
import Link from "next/link"

export const CardCosts = ({ data }: { data: DashboardDataType }) => {
    return (
        <div className="flex flex-col gap-4">
            <Link
                href="/costs"
                className={badgeVariants({ variant: "outline" })}
            >
                <BadgeDollarSign className="size-4 mr-1 text-cyan-600" />
                Kosten
            </Link>
            <Card className="min-w-[400px]">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-muted-foreground">
                            Deze maand
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                <FuelIcon className="mr-2 size-4 text-cyan-600" />
                                {currencyFilter(data.costs.thisMonth.fuel)}
                            </span>
                            <span className="text-right text-muted-foreground">
                                Brandstof
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                <TicketIcon className="mr-2 size-4 text-cyan-600" />
                                {currencyFilter(data.costs.thisMonth.costs)}
                            </span>
                            <span className="text-right text-muted-foreground">
                                Andere kosten
                            </span>
                        </div>
                        <span className="text-muted-foreground">
                            Vorige maand
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                <FuelIcon className="mr-2 size-4 text-cyan-600" />
                                {currencyFilter(data.costs.prevMonth.fuel)}
                            </span>
                            <span className="text-right text-muted-foreground">
                                Brandstof
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center">
                                <TicketIcon className="mr-2 size-4 text-cyan-600" />
                                {currencyFilter(data.costs.prevMonth.costs)}
                            </span>
                            <span className="text-right text-muted-foreground">
                                Andere kosten
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}