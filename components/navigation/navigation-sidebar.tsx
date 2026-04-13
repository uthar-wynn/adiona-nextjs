"use client"

import { VehicleSelector } from "@/features/vehicles/components/vehicle-selector";
import { CarFront, Coins, Fuel, LayoutDashboard, LineChart, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "../ui/sidebar";

const routes = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Voertuigen",
        href: "/vehicles",
        icon: CarFront
    },
    {
        label: "Tankbeurten",
        href: "/refueling",
        icon: Fuel
    },
    {
        label: "Statistieken",
        href: "/statistics",
        icon: List
    },
    {
        label: "Grafieken",
        href: "/graphs",
        icon: LineChart
    },
    {
        label: "Kosten",
        href: "/costs",
        icon: Coins
    }
]

export const NavigationSidebar = () => {
    const pathname = usePathname()
    const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0]

    return (
        <Sidebar collapsible="icon" className="group/sidebar">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Logo />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <VehicleSelector />
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarMenu>
                        {routes.map((route, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={route.label}
                                    className="gap-x-4 h-10 px-4"
                                    isActive={
                                        route.href === "/" ? pathname === "/" : pathname.startsWith(route.href)
                                    }
                                >
                                    <Link
                                        href={route.href}
                                        prefetch
                                    >
                                        <route.icon className="size-4" />
                                        {route.label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}