"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useCallback } from "react"


interface NavItemProps {
    href: string
    label: string
    Icon: LucideIcon
}

export const NavItem = ({
    href,
    label,
    Icon
}: NavItemProps) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const onNavigate = useCallback((href: string) => {
        let currentQuery = {}

        if (href === "/vehicles") return router.push(href)

        if (searchParams) currentQuery = qs.parse(searchParams.toString())

        const updatedQuery: any = {
            ...currentQuery
        }

        const url = qs.stringifyUrl({
            url: href,
            query: updatedQuery
        })

        router.push(url)
    }, [router, searchParams])

    return (
        <div
            onClick={() => onNavigate(href)}
            className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === href && "bg-primary/10 text-primary"
            )}>
            <div className="flex flex-col gap-y-2 items-center flex-1">
                <Icon className="h-5 w-5" />
                {label}
            </div>
        </div>
    )
}