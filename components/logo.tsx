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
                "text-2xl font-extrabold flex items-center gap-2",
                fontSize
            )}
        >
            <div className="rounded-xl bg-gradient-to-r from-neutral-500 to-neutral-600 p-2">
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