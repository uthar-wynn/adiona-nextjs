"use client"

import { usePathname } from "next/navigation"
import React from "react"
import { MobileSidebar } from "./navigation/navigation-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"

export const BreadcrumbHeader = () => {
    const pathname = usePathname()
    const paths = pathname === "/" ? [""] : pathname?.split("/")

    return (
        <div className="flex items-center flex-start">
            <MobileSidebar />
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${path}`} className="capitalize">
                                    {path === "" ? "Home" : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index !== paths.length - 1 && (
                                <BreadcrumbSeparator />
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}