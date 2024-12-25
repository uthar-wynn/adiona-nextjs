import { GraphDataType } from "@/app/actions/graphs/get-graph-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { GaugeCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const ChartMonthlyDistance = ({ data }: { data: GraphDataType }) => {
    const { monthlyCosts } = data
    const dataAvailable = data && monthlyCosts.length > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 lg:grid-flow-col">
                    <span className="text-2xl font-bold flex items-center gap-2">
                        <GaugeCircle className="size-6 text-primary" />
                        Maandelijks afgelegde afstand
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {dataAvailable ? (
                    <ResponsiveContainer width={"100%"} height={300}>
                        <BarChart
                            height={300}
                            data={monthlyCosts}
                            barCategoryGap={5}
                        >
                            <defs>
                                <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset={"0"} stopColor="#3b82f6" stopOpacity={"1"} />
                                    <stop offset={"1"} stopColor="#3b82f6" stopOpacity={"0"} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(val) => format(new Date(val), "MMM yy")}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                label={{
                                    value: "Afstand",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#888888"
                                }}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="totalDistance"
                                label="TEST"
                                fill="url(#gradientBar)"
                                radius={[4, 4, 0, 0]}
                                strokeWidth={2}
                            />
                        </BarChart>
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

    const { month, totalDistance } = payload[0].payload

    return (
        <div className="flex flex-col min-w-[300px] rounded border-collapse bg-background p-4">
            <span className="mb-2 text-sm text-muted-foreground font-bold">
                {format(new Date(month), "MMMM yyyy")}
            </span>
            <TooltipRow label="Afstand" value={totalDistance} bgColor="bg-blue-500" textColor="text-blue-500" />
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
                    {value} km
                </div>
            </div>
        </div>
    )
}