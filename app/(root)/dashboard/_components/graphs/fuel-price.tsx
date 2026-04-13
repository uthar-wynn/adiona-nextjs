import { DashboardGraphItem } from "@/app/actions/dashboard/get-data"
import { format } from "date-fns"
import { FuelIcon } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DataColumn } from "./data-column"

export const FuelPriceCard = ({ data }: { data: DashboardGraphItem }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <span className="text-2xl font-bold flex items-center gap-2">
                <FuelIcon className="size-6 text-primary" />
                Brandstofprijs
            </span>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                    <DataColumn
                        valuta="Prijs/L"
                        last={data.last}
                        average={data.average}
                        change={data.change}
                    />
                </div>
                <div className="col-span-4">
                    <ResponsiveContainer width={"100%"} height={300}>
                        <LineChart
                            height={300} data={data.data}
                        >
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => format(value, "dd MMM")}
                            />
                            <YAxis
                                hide
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                domain={[
                                    (dataMin: number) => Math.floor(dataMin / 0.1) * 0.1,
                                    (dataMax: number) => Math.ceil(dataMax / 0.1) * 0.1
                                ]}
                            />
                            <CartesianGrid vertical={false} strokeDasharray="5 5" />

                            <Line
                                dataKey="unit_price"
                                type="linear"
                                stroke="#10b981"
                                strokeWidth={2}
                            />
                            <Line
                                dataKey={"avg.fuel_price"}
                                type="monotone"
                                stroke="#3b82f6"
                                strokeDasharray="5 5"
                                dot={false}
                                name="Gemiddeld verbruik"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}