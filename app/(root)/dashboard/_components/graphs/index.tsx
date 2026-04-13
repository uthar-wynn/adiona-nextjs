import { DashboardGraphs } from "@/app/actions/dashboard/get-data";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import { FuelConsumptionCard } from "./fuel-consumption";
import { FuelCostCard } from "./fuel-cost";
import { FuelPriceCard } from "./fuel-price";
import { MonthCostCard } from "./month-cost";
import { MonthOtherCostCard } from "./month-other-cost";

export const CardGraphs = ({ data }: { data: DashboardGraphs }) => {
    return (
        <div className="hidden sm:flex flex-col gap-4">
            <Button variant="outline" asChild>
                <Link
                    href="/graphs"
                    className={badgeVariants({ variant: "outline" })}
                >
                    <TrendingUpIcon className="size-4 mr-2 text-cyan-600" />
                    Trends
                </Link>
            </Button>
            <Card className="w-full">
                <CardContent className="p-4">
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem>
                                <FuelConsumptionCard data={data["FUEL_CONSUMPTION"]} />
                            </CarouselItem>
                            <CarouselItem>
                                <FuelPriceCard data={data["FUEL_PRICE"]} />
                            </CarouselItem>
                            <CarouselItem>
                                <MonthCostCard data={data["MONTH_COST"]} />
                            </CarouselItem>
                            <CarouselItem>
                                <MonthOtherCostCard data={data["MONTH_OTHER"]} />
                            </CarouselItem>
                            <CarouselItem>
                                <FuelCostCard data={data["FUEL_COST"]} />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>
        </div>
    );
}