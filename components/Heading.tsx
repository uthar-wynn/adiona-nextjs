"use client"

import { cn } from "@/lib/utils"

interface HeadingProps {
    title: string
    subtitle?: string
    center?: boolean
}

const Heading = ({
    title,
    subtitle,
    center
}: HeadingProps) => {
    return (
        <div className={cn(
            "",
            center ? "text-center" : "text-start"
        )}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subtitle}
            </div>
        </div>
    );
}

export default Heading;