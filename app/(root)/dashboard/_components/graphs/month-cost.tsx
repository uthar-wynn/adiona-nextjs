import { DashboardGraphItem } from "@/app/actions/dashboard/get-data"
import { format } from "date-fns"
import { FuelIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DataColumn } from "./data-column"

export const MonthCostCard = ({ data }: { data: DashboardGraphItem }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <span className="text-2xl font-bold flex items-center gap-2">
                <FuelIcon className="size-6 text-primary" />
                Maandelijkse kosten (Brandstof)
            </span>
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
                        <BarChart
                            height={300}
                            data={Object.values(data.data)}
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
                                interval={1}
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
                                dataKey="value"
                                label="TEST"
                                fill="url(#gradientBar)"
                                radius={[4, 4, 0, 0]}
                                strokeWidth={2}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}