import { GraphDataType } from "@/app/actions/graphs/get-graph-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { numberFormatter } from "@/lib/filters"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { FuelIcon } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const ChartFuelUsage = ({ data }: { data: GraphDataType }) => {
    const { fillups } = data
    const dataAvailable = data && fillups.length > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 lg:grid-flow-col">
                    <span className="text-2xl font-bold flex items-center gap-2">
                        <FuelIcon className="size-6 text-primary" />
                        Brandstofverbuik
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
                                    value: "Verbuik (l/100km)",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#888888"
                                }}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                dataKey="consumption"
                                type="monotone"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                dataKey={"avg.consumption"}
                                type="monotone"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                name="Gemiddeld verbruik"
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

    const { date, consumption, avg } = payload[0].payload

    return (
        <div className="flex flex-col min-w-[300px] rounded border-collapse bg-background p-4">
            <span className="mb-2 text-sm text-muted-foreground font-bold">
                {format(date, "PPP")}
            </span>
            <TooltipRow label="Verbruik" value={consumption} bgColor="bg-green-500" textColor="text-green-500" />
            <TooltipRow label="Gemiddelde" value={avg.consumption} bgColor="bg-blue-500" textColor="text-blue-500" />
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
                    {numberFormatter(value)}&nbsp;
                    <span>
                        l/100 km
                    </span>
                </div>
            </div>
        </div>
    )
}