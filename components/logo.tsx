"use client"

import { cn } from "@/lib/utils"
import { FuelIcon } from "lucide-react"
import Link from "next/link"

export const Logo = (
    {
        fontSize = "text-2xl",
        iconSize = 20
    }: {
        fontSize?: string
        iconSize?: number
    }
) => {
    return (
        <Link
            href="/"
            className={cn(
                "text-2xl font-extrabold flex items-center space-x-2",
                fontSize
            )}
        >
            <div className="rounded-2xl bg-gradient-to-r from-neutral-500 to-neutral-600 p-2 group-data-[collapsible=icon]:[&>svg]:size-3">
                <FuelIcon size={iconSize} className="text-white" />
            </div>
            <div>
                <span className="bg-gradient-to-r from-neutral-500 to-neutral-600 bg-clip-text text-transparent">
                    Adiona
                </span>
            </div>
        </Link>
    )
}