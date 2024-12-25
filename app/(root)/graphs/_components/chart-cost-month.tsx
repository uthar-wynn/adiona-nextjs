import { GraphDataType } from "@/app/actions/graphs/get-graph-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currencyFilter } from "@/lib/filters"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { BadgeEuroIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const ChartCostMonth = ({ data }: { data: GraphDataType }) => {
    const { fillups, monthlyCosts } = data
    const dataAvailable = data && fillups.length > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 lg:grid-flow-col">
                    <span className="text-2xl font-bold flex items-center gap-2">
                        <BadgeEuroIcon className="size-6 text-primary" />
                        Maandelijkse kosten
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
                                    <stop offset={"0"} stopColor="#f43f5e" stopOpacity={"1"} />
                                    <stop offset={"1"} stopColor="#f43f5e" stopOpacity={"0"} />
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
                                    value: "Totaal bedrag",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#888888"
                                }}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="totalCost"
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

    const { month, totalCost } = payload[0].payload

    return (
        <div className="flex flex-col min-w-[300px] rounded border-collapse bg-background p-4">
            <span className="mb-2 text-sm text-muted-foreground font-bold">
                {format(new Date(month), "MMMM yyyy")}
            </span>
            <TooltipRow label="Totaal bedrag" value={totalCost} bgColor="bg-red-500" textColor="text-red-500" />
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