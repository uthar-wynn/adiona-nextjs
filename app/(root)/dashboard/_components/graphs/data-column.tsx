import { digitFormatter } from "@/lib/filters"
import { cn } from "@/lib/utils"

interface Props {
    valuta: string
    last: number
    average: number
    change: number
}

export const DataColumn = ({
    valuta,
    last,
    average,
    change
}: Props) => {
    return (
        <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground">
                Laatste
            </span>
            <div className="flex flex-row gap-2 items-center">
                <span className="font-semibold text-lg">
                    {digitFormatter(last)}
                </span>
                <span className="text-muted-foreground">
                    {valuta}
                </span>
            </div>
            <span className="text-muted-foreground">
                Gem.
            </span>
            <div className="flex flex-row gap-2 items-center">
                <span className="font-semibold text-lg">
                    {digitFormatter(average)}
                </span>
                <span className="text-muted-foreground">
                    {valuta}
                </span>
            </div>
            <span className="text-muted-foreground">
                Verschil
            </span>
            <span className={cn(
                "font-semibold text-lg",
                change > 0 ? "text-red-600" : "text-emerald-600"
            )}>
                {change > 0 ? "+" : ""}
                {digitFormatter(change, 1)}%
            </span>
        </div>
    )
}