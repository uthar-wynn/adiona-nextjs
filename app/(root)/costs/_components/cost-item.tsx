import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { currencyFilter } from "@/lib/filters"
import { Costs } from "@prisma/client"
import { format } from "date-fns"
import { AlignLeftIcon, CalendarRangeIcon } from "lucide-react"
import { CostItemActions } from "./cost-item-actions"

interface Props {
    cost: Costs
}

export const CostItem = ({
    cost
}: Props) => {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-6 items-center">
                            <div className="bg-cyan-600 size-12 rounded-full flex items-center justify-center text-2xl">
                                {cost.category.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg">
                                    {format(cost.date!, "dd-MM-yyyy")}
                                </span>
                                <span className="text-muted-foreground uppercase">
                                    {cost.category}
                                </span>
                            </div>
                        </div>
                        <span className="flex space-x-4 items-center">
                            <AlignLeftIcon className="size-4 text-cyan-600" />
                            <p>
                                {cost.title}
                            </p>
                        </span>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <span className="text-xl font-bold">
                            {cost.cost && currencyFilter(cost.cost)}
                        </span>
                        <CostItemActions cost={cost} />
                    </div>
                </div>
                {cost.notes && (
                    <>
                        <Separator className="my-2" />
                        <span className="flex space-x-4 items-center">
                            <CalendarRangeIcon className="size-4 text-cyan-600" />
                            <p>
                                {cost.notes}
                            </p>
                        </span>
                    </>
                )}
            </CardContent>
        </Card>
    )
}