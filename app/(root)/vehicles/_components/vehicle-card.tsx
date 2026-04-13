import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
import { cn } from "@/lib/utils"
import { Vehicle } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { CarFrontIcon, MoreVertical, PencilIcon, Trash2Icon } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
    return (
        <Card>
            <CardContent className="p-4 relative pr-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                        <div
                            className={cn(
                                "flex size-10 shrink-0 items-center justify-center rounded-full",
                                vehicle.enabled ? "bg-emerald-500" : "bg-rose-500"
                            )}
                        >
                            <CarFrontIcon className="size-5 text-white" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold">
                                {vehicle.name}
                            </h3>
                            <p className="truncate text-xs text-muted-foreground">
                                {vehicle.description || "—"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:justify-end">
                        {vehicle.plate && (
                            <Badge className="flex h-10 min-w-[100px] items-center justify-center rounded-full border-2 border-red-500 bg-slate-200 text-red-500">
                                {vehicle.plate}
                            </Badge>
                        )}

                        <span className="text-sm lowercase text-muted-foreground">
                            {vehicle.fuel_type}
                        </span>

                    </div>
                    <div className="absolute right-4 top-4">
                        <VehicleActions vehicle={vehicle} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const VehicleActions = ({ vehicle }: { vehicle: Vehicle }) => {
    const queryClient = useQueryClient()
    const { onOpen } = useModal()

    const { mutate } = useMutation({
        mutationFn: () => axios.delete(`/api/vehicles/${vehicle.id}`).then(res => res.data),
        onMutate: () => {
            toast.loading("Verwijderen voertuig...", { id: "delete-vehicle" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] })
            toast.success("Voertuig is met succes verwijderd!", { id: "delete-vehicle" })
        },
        onError: () => {
            toast.error("Er is iets fout gelopen bij verwijderen voertuig", { id: "delete-vehicle" })
        }
    })

    const onAction = (e: React.MouseEvent) => {
        e.stopPropagation()
        onOpen("editVehicle", { vehicle })
    }

    const onRemove = useCallback(() => {
        mutate()
    }, [mutate])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical className="size-6 text-zinc-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
                <DropdownMenuItem onClick={(e) => onAction(e)}>
                    <div className="flex items-center">
                        <PencilIcon className="size-4 mr-2" />
                        Bewerken
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ConfirmModal onConfirm={() => onRemove()}>
                        <div className="flex items-center">
                            <Trash2Icon className="size-4 mr-2" />
                            Verwijderen
                        </div>
                    </ConfirmModal>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}