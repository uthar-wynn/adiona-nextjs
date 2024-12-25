"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { CarFront, Coins, Fuel, LayoutDashboard, LineChart, List } from "lucide-react";
import { NavItem } from "./nav-item";

const Navbar = () => {
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
        },
    ]

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] bg-[#e3e5e8] py-3">

            <Separator className="h-0.5 bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {routes.map((route) => (
                    <NavItem
                        key={route.label}
                        label={route.label}
                        href={route.href}
                        Icon={route.icon}
                    />
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "size-12"
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Navbar;