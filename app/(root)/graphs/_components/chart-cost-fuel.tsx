import { GraphDataType } from "@/app/actions/graphs/get-graph-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currencyFilter } from "@/lib/filters"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { BadgeEuroIcon } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const ChartCostFuel = ({ data }: { data: GraphDataType }) => {
    const { fillups } = data
    const dataAvailable = data && fillups.length > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 lg:grid-flow-col">
                    <span className="text-2xl font-bold flex items-center gap-2">
                        <BadgeEuroIcon className="size-6 text-primary" />
                        Kosten tankbeurt
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {dataAvailable ? (
                    <ResponsiveContainer width={"100%"} height={300}>
                        <LineChart
                            height={300} data={fillups}
                        >
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => format(value, "dd MMM yy")}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                label={{
                                    value: "Totaal bedrag",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#888888"
                                }}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                dataKey="volume_price"
                                type="monotone"
                                stroke="#f97316"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div>
                        <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
                            Geen gegevens gevonden voor het geselecteerde voertuig
                            <p className="text-sm text-muted-foreground">
                                Probeer een voertuig te selecteren of kies een nieuwe periode
                            </p>
                        </Card>
                    </div>
                )
                }
            </CardContent>
        </Card>
    )
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null

    const { date, volume_price } = payload[0].payload

    return (
        <div className="flex flex-col min-w-[300px] rounded border-collapse bg-background p-4">
            <span className="mb-2 text-sm text-muted-foreground font-bold">
                {format(date, "PPP")}
            </span>
            <TooltipRow label="Totaal bedrag" value={volume_price} bgColor="bg-orange-500" textColor="text-orange-500" />
        </div>
    )
}

const TooltipRow = ({ label, value, bgColor, textColor }: {
    label: string
    value: number
    bgColor: string
    textColor: string
}) => {
    return (
        <div className="flex items-center gap-2">
            <div className={cn("size-4 rounded-full", bgColor)} />
            <div className="flex w-full justify-between">
                <p className="text-sm text-muted-foreground">
                    {label}
                </p>
                <div className={cn("text-sm font-bold", textColor)}>
                    {currencyFilter(value)}
                </div>
            </div>
        </div>
    )
}