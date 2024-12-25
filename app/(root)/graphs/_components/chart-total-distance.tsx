import { GraphDataType } from "@/app/actions/graphs/get-graph-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { GaugeCircle } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const ChartTotalDistance = ({ data }: { data: GraphDataType }) => {
    const { fillups } = data
    const dataAvailable = data && fillups.length > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 lg:grid-flow-col">
                    <span className="text-2xl font-bold flex items-center gap-2">
                        <GaugeCircle className="size-6 text-primary" />
                        Totaal kilometerteller
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {dataAvailable ? (
                    <ResponsiveContainer width={"100%"} height={300}>
                        <AreaChart
                            height={300}
                            data={fillups}
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
                                    value: "Afstand (km)",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#888888"
                                }}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                dataKey="distance"
                                type="monotone"
                                stroke="#eab308"
                                fill="#eab308"
                                fillOpacity={0.4}
                                strokeWidth={2}
                            />
                        </AreaChart>
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

    const { date, distance } = payload[0].payload

    return (
        <div className="flex flex-col min-w-[300px] rounded border-collapse bg-background p-4">
            <span className="mb-2 text-sm text-muted-foreground font-bold">
                {format(date, "PPP")}
            </span>
            <TooltipRow label="Kilometerteller" value={distance} bgColor="bg-yellow-500" textColor="text-yellow-500" />
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
                <div className={cn("text-sm font-bold space-x-2", textColor)}>
                    {value} km
                </div>
            </div>
        </div>
    )
}