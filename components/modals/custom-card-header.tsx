import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"

interface CustomCardHeaderProps {
    title?: string
    subTitle?: string
    Icon?: LucideIcon
    iconClassName?: string
    titleClassName?: string
    subtitleClassName?: string
}

export const CustomCardHeader = ({
    title,
    subTitle,
    Icon,
    iconClassName,
    titleClassName,
    subtitleClassName
}: CustomCardHeaderProps) => {
    return (
        <CardHeader>
            <CardTitle>
                <div className="flex flex-col items-center gap-2 mb-2">
                    {Icon && (
                        <Icon size={30} className={cn("stroke-primary", iconClassName)} />
                    )}
                    {title && (
                        <p className={cn("text-xl text-primary", titleClassName)}>
                            {title}
                        </p>
                    )}
                    {subTitle && (
                        <p className={cn("text-sm text-muted-foreground", subtitleClassName)}>
                            {subTitle}
                        </p>
                    )}
                </div>
            </CardTitle>
            <CardDescription />
            <Separator />
        </CardHeader>
    )
}