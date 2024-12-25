import { DashboardDataType } from "@/app/actions/dashboard/get-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { currencyFilter } from "@/lib/filters"
import { format } from "date-fns"
import { FuelIcon, TrendingUp } from "lucide-react"

export const CardLastInput = ({ data }: { data: DashboardDataType }) => {
    return (
        <div className="flex flex-col gap-4">
            <Badge variant="outline">
                <TrendingUp className="size-4 mr-1 text-cyan-600" />
                Laatste ingave
            </Badge>
            <Card className="min-w-[400px]">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                        {data.lastLogs.map((log) => (
                            <div key={log.id} className="flex items-center justify-between">
                                <span className="flex items-center space-x-2">
                                    <FuelIcon className="mr-2 size-4 text-cyan-600" />
                                    {currencyFilter(log.volume_price)}
                                    <span className="text-sm text-muted-foreground">
                                        {format(log.date, "	iiiiii, dd")}
                                    </span>
                                </span>
                                <span className="text-right text-muted-foreground">
                                    Voltanken
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}