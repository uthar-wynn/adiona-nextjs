import { DashboardGraphItem } from "@/app/actions/dashboard/get-data"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { TicketIcon } from "lucide-react"
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DataColumn } from "./data-column"

export const FuelCostCard = ({ data }: { data: DashboardGraphItem }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <span className="text-2xl font-bold flex items-center gap-2">
                    <TicketIcon className="size-6 text-primary" />
                    Brandstofkosten
                </span>
                <div className="flex flex-row gap-2">
                    <Badge variant="outline" className="flex items-center gap-2 text-sm">
                        <div className="size-4 rounded-full bg-blue-500" />
                        Brandstof
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-2 text-sm">
                        <div className="size-4 rounded-full bg-amber-500" />
                        Andere kosten
                    </Badge>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                    <DataColumn
                        valuta="EUR"
                        last={data.last}
                        average={data.average}
                        change={data.change}
                    />
                </div>
                <div className="col-span-4">
                    <ResponsiveContainer width={"100%"} height={300}>
                        <ComposedChart
                            height={300}
                            data={Object.values(data.data)}
                            barCategoryGap={5}
                        >
                            <defs>
                                <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset={"1"} stopColor="#3b82f6" stopOpacity={"1"} />
                                    <stop offset={"1"} stopColor="#3b82f6" stopOpacity={"1"} />
                                </linearGradient>
                                <linearGradient id="otherBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset={"1"} stopColor="#eab308" stopOpacity={"1"} />
                                    <stop offset={"1"} stopColor="#eab308" stopOpacity={"1"} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => format(value, "MMM yy")}
                            />
                            <YAxis
                                hide
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}

                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />

                            <Bar
                                dataKey="fuel"
                                label="Brandstof"
                                fill="url(#gradientBar)"
                                radius={[0, 0, 0, 0]}
                                strokeWidth={2}
                                stackId="a"
                            />
                            <Bar
                                dataKey="cost"
                                label="Kosten"
                                fill="url(#otherBar)"
                                radius={[4, 4, 0, 0]}
                                strokeWidth={2}
                                stackId="a"
                            />
                            <Line
                                dataKey={"average"}
                                type="monotone"
                                stroke="#3b82f6"
                                strokeDasharray="5 5"
                                dot={false}
                                name="Gemiddelde"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}