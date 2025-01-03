"use client"

import { ActiveVehiclesType } from "@/app/actions/vehicles/getActiveVehicles"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { costSchema, costSchemaType } from "@/features/costs/schemas"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import { BanknoteIcon, CalendarIcon, CircleDollarSign, GaugeCircleIcon, MessagesSquare, RefreshCwIcon, TagIcon, Type } from "lucide-react"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CustomCardHeader } from "../custom-card-header"

interface Props {
    onCancel: () => void
    selectedVehicle: ActiveVehiclesType[number]
}

export const CreateCostForm = ({
    onCancel,
    selectedVehicle
}: Props) => {
    const queryClient = useQueryClient()

    const form = useForm({
        resolver: zodResolver(costSchema),
        defaultValues: {
            vehicle_id: selectedVehicle.id,
            category: "dienst",
            title: "",
            cost: undefined,
            date: new Date(),
            is_income: false,
            repeat: "once",
            notes: "",
            distance: undefined
        }
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (values: costSchemaType) => axios.post("/api/costs", values).then(res => res.data),
        onMutate: () => {
            toast.loading("Opslaan kost...", { id: "create-cost" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["costs", selectedVehicle.id] })
            toast.success("Kost is met succes toegevoegd!", { id: "create-cost" })
            handleClose()
        },
        onError: () => {
            toast.error("Er is iets fout gelopen bij toevoegen kost", { id: "create-cost" })
        }
    })

    const onSubmit = useCallback((values: costSchemaType) => {
        mutate(values)
    }, [mutate])

    const handleClose = () => {
        form.reset()
        onCancel()
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardContent className="px-0">
                <CustomCardHeader
                    title="Kost toevoegen"
                    Icon={BanknoteIcon}
                />
                <div className="p-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex w-full max-w-md items-center space-x-2">
                                            <TagIcon className="size-4" />
                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem key="dienst" value="dienst">Dienst</SelectItem>
                                                    <SelectItem key="onderhoud" value="onderhoud">Onderhoud</SelectItem>
                                                    <SelectItem key="registratie" value="registratie">Registratie</SelectItem>
                                                    <SelectItem key="parkeren" value="parkeren">Parkeren</SelectItem>
                                                    <SelectItem key="wasbeurt" value="wasbeurt">Wasbeurt</SelectItem>
                                                    <SelectItem key="tolbedragen" value="tolbedragen">Tolbedragen</SelectItem>
                                                    <SelectItem key="boetes" value="boetes">Boetes</SelectItem>
                                                    <SelectItem key="tuning" value="tuning">Tuning</SelectItem>
                                                    <SelectItem key="verzekering" value="verzekering">Verzekering</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex w-full max-w-md items-center space-x-2">
                                                <Type className="size-4" />
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Titel"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cost"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex w-full max-w-md items-center space-x-2">
                                                <CircleDollarSign className="size-4" />
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Totale kosten"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex w-full max-w-md items-center space-x-2">
                                                <CalendarIcon className="size-4" />
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal focus-visible:ring-0 focus-visible:ring-offset-0",
                                                                    !field.value && "text-muted"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "dd/MM/yyyy")
                                                                ) : (
                                                                    <span>
                                                                        Kies een datum
                                                                    </span>
                                                                )}
                                                                <CalendarIcon className="ml-auto size-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            captionLayout="dropdown-buttons"
                                                            fromYear={2013}
                                                            toYear={2050}
                                                            defaultMonth={field.value}
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator />
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex w-full max-w-md items-center space-x-2">
                                                <MessagesSquare className="size-4" />
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Opmerking"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="distance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex w-full max-w-md items-center space-x-2">
                                                <GaugeCircleIcon className="size-4" />
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Kilometerteller"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator />
                            <FormField
                                control={form.control}
                                name="repeat"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex w-full max-w-md items-center space-x-2">
                                            <RefreshCwIcon className="size-4" />
                                            <Select
                                                disabled={isPending}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem key="once" value="once">Eenmalige kosten</SelectItem>
                                                    <SelectItem key="monthly" value="monthly">Maandelijkse kosten</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                size="lg"
                                className="w-full"
                                disabled={isPending}
                            >
                                Toevoegen
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}