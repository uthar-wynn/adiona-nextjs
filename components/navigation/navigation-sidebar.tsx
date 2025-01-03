"use client"

import { VehicleSelector } from "@/features/vehicles/components/vehicle-selector";
import { CarFront, Coins, Fuel, LayoutDashboard, LineChart, List, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "../logo";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

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
        <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-secondary dark:bg-secondary/80 dark:text-foreground border-r-2">
            <div className="flex items-center justify-center gap-2 border-b border-separate p-4">
                <Logo />
            </div>
            <div className="p-2">
                <VehicleSelector />
            </div>
            <Separator className="my-2" />
            <div className="flex flex-col p-2">
                {routes.map((route, index) => (
                    <Link
                        key={index}
                        href={route.href}
                        className={buttonVariants({
                            variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem"
                        })}
                    >
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0]

    return (
        <div className="block md:hidden border-separate bg-background">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-[400px] sm:w-[540px] space-y-4"
                    >
                        <Logo />
                        <div className="p-1">
                            <VehicleSelector />
                        </div>
                        <Separator className="my-0.5" />
                        <div className="flex flex-col p-1">
                            {routes.map((route, index) => (
                                <Link
                                    key={index}
                                    href={route.href}
                                    onClick={() => setIsOpen(prev => !prev)}
                                    className={buttonVariants({
                                        variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem"
                                    })}
                                >
                                    <route.icon size={20} />
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}