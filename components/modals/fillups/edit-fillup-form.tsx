"use client"

import UpdateFillup from "@/app/actions/fillups/UpdateFillup"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { editFillupSchema, editFillupSchemaType } from "@/features/fillups/schemas"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fillup } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { debounce } from "lodash"
import { CalendarIcon, FuelIcon } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CustomCardHeader } from "../custom-card-header"

interface Props {
    onCancel: () => void
    initialValues: Fillup
}

export const EditFillupForm = ({
    onCancel,
    initialValues
}: Props) => {
    const queryClient = useQueryClient()

    const form = useForm({
        resolver: zodResolver(editFillupSchema),
        defaultValues: {
            vehicle_id: initialValues.vehicle_id,
            counter: "Kilometerteller",
            date: new Date(),
            distance: 0,
            fuel: 0,
            full: true,
            unit_price: 0,
            consumption: 0,
            volume_price: 0
        }
    })

    useEffect(() => {
        if (initialValues)
            form.reset({
                vehicle_id: initialValues.vehicle_id,
                date: initialValues.date,
                distance: initialValues.distance,
                fuel: initialValues.fuel,
                full: initialValues.full,
                unit_price: initialValues.unit_price,
                consumption: initialValues.consumption,
                volume_price: initialValues.volume_price
            })
    }, [form, initialValues])

    const { mutate, isPending } = useMutation({
        mutationFn: (values: editFillupSchemaType) => UpdateFillup({ id: initialValues.id, data: values }),
        onMutate: () => {
            toast.loading("Opslaan tankbeurt...", { id: "edit-fillup" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fillups", initialValues.vehicle_id] })
            queryClient.invalidateQueries({ queryKey: ["active-vehicles"] })
            toast.success("Tankbeurt is met succes aangepast!", { id: "edit-fillup" })
            handleClose()
        },
        onError: () => {
            toast.error("Er is iets fout gelopen bij aanpassen tankbeurt", { id: "edit-fillup" })
        }
    })

    const onSubmit = useCallback((values: editFillupSchemaType) => {
        mutate(values)
    }, [mutate])

    const handleClose = () => {
        form.reset()
        onCancel()
    }

    const handleFuelChange = debounce(() => {
        calculateTotalPrice()
    }, 500)

    const handlePriceChange = debounce(() => {
        calculateTotalPrice()
    }, 500)

    const calculateTotalPrice = () => {
        const fuel = form.getValues("fuel")
        const unit_price = form.getValues("unit_price")

        const total_price = fuel * unit_price
        form.setValue("volume_price", parseFloat(total_price.toFixed(2)))
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardContent className="px-0">
                <CustomCardHeader
                    title="Tankbeurt bewerken"
                    Icon={FuelIcon}
                />
                <div className="p-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {Object.keys(form.formState.errors).length > 0 && (
                                <pre>
                                    {JSON.stringify(form.formState.errors, null, 4)}
                                </pre>
                            )}
                            <FormField
                                control={form.control}
                                name="counter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>&nbsp;</FormLabel>
                                        <FormControl>
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
                                                    <SelectGroup className="p-1 ml-2">
                                                        Kilometerteller
                                                    </SelectGroup>
                                                    <SelectItem value="Kilometerteller" className="capitalize">
                                                        Kilometerteller
                                                    </SelectItem>
                                                    <SelectItem value="Dagteller" className="capitalize">
                                                        Dagteller
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                        <FormLabel>
                                            Afstand
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Afstand"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fuel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Brandstof
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                onChangeCapture={(e) => handleFuelChange()}
                                                disabled={isPending}
                                                placeholder="Brandstof"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
                                <FormField
                                    control={form.control}
                                    name="unit_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Prijs/l
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    onChangeCapture={(e) => handlePriceChange()}
                                                    disabled={isPending}
                                                    placeholder="Prijs/l"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="volume_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Totale kosten
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Totale kosten"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Datum
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-60 pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        fromYear={2001}
                                                        toYear={2100}
                                                        defaultMonth={field.value}
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="full"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 justify-center">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Volle tank
                                                </FormLabel>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                size="lg"
                                className="w-full"
                                disabled={isPending}
                            >
                                Bewerken
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}