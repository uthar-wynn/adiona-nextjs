import { DashboardDataType } from "@/app/actions/dashboard/get-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { currencyFilter } from "@/lib/filters"
import { format } from "date-fns"
import { FuelIcon, ReceiptIcon, TrendingUp } from "lucide-react"

export const CardLastInput = ({ data }: { data: DashboardDataType }) => {
    return (
        <div className="flex flex-col gap-4">
            <Button variant="outline">
                <TrendingUp className="size-4 mr-1 text-cyan-600" />
                Laatste ingave
            </Button>
            <Card className="min-w-[400px]">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                        {data.lastLogs.map((log) => (
                            <div key={log.id} className="flex items-center justify-between">
                                <span className="flex items-center space-x-2">
                                    {log.type === "FILLUP" ? (
                                        <FuelIcon className="mr-2 size-4 text-cyan-600" />
                                    ) : (
                                        <ReceiptIcon className="mr-2 size-4 text-cyan-600" />
                                    )}
                                    {currencyFilter(log.cost)}
                                    <span className="text-sm text-muted-foreground">
                                        {format(log.date, "	iiiiii, dd")}
                                    </span>
                                </span>
                                <span className="text-right text-muted-foreground">
                                    {log.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}