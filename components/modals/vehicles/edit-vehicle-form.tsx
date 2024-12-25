"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { vehicleSchema, vehicleSchemaType } from "@/features/vehicles/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { FuelType, Vehicle } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { CarFront } from "lucide-react"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CustomCardHeader } from "../custom-card-header"

interface EditVehicleFormProps {
    onCancel: () => void
    initialValues: Vehicle
}

export const EditVehicleForm = ({
    onCancel,
    initialValues
}: EditVehicleFormProps) => {
    const queryClient = useQueryClient()

    const form = useForm<vehicleSchemaType>({
        resolver: zodResolver(vehicleSchema.omit({})),
        defaultValues: {
            name: "",
            description: "",
            fuel_type: initialValues.fuel_type,
            vin: "",
            insurance: "",
            plate: "",
            make: "",
            model: "",
            year: "",
            enabled: true,
        }
    })

    useEffect(() => {
        if (initialValues)
            form.reset({
                name: initialValues.name,
                description: initialValues.description || "",
                fuel_type: initialValues.fuel_type,
                vin: initialValues.vin || "",
                insurance: initialValues.insurance || "",
                plate: initialValues.plate || "",
                make: initialValues.make || "",
                model: initialValues.model || "",
                year: initialValues.year || "",
                enabled: initialValues.enabled
            })

    }, [form, initialValues])

    const { mutate, isPending } = useMutation({
        mutationFn: (values: vehicleSchemaType) => axios.patch(`/api/vehicles/${initialValues.id}`, values).then(res => res.data),
        onMutate: () => {
            toast.loading("Opslaan voertuig...", { id: "update-vehicle" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] })
            queryClient.invalidateQueries({ queryKey: ["active-vehicles"] })
            toast.success("Voertuig is met succes aangepast!", { id: "update-vehicle" })
            handleClose()
        },
        onError: () => {
            toast.error("Er is iets fout gelopen bij aanpassen voertuig", { id: "update-vehicle" })
        }
    })

    const onSubmit = useCallback((values: vehicleSchemaType) => {
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
                    title="Voertuig bewerken"
                    Icon={CarFront}
                />
                <div className="p-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel                                        >
                                            Naam
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Naam"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >
                                            Beschrijving
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Beschrijving"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fuel_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel >
                                            Brandstoftype
                                        </FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Brandstoftype" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(FuelType).map((fuel_type) => (
                                                    <SelectItem
                                                        key={fuel_type}
                                                        value={fuel_type}
                                                    >
                                                        {fuel_type.toLocaleLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="make"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Merk
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Merk"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Model
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Model"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel >
                                                Jaar
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Jaar"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="plate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Kenteken
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    placeholder="Kenteken"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="vin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            VIN
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="VIN"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="insurance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Verzekeringspolis
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Verzekeringspolis"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="enabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                Actief
                                            </FormLabel>
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
                                Aanpassen
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}