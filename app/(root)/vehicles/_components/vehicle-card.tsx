import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
import { cn } from "@/lib/utils"
import { Vehicle } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { CarFront, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
    return (
        <Card>
            <CardContent className="p-4 flex items-center justify-between h-[100px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 space-x-4">
                    <div className="flex items-center justify-end space-x-3">
                        <div className={cn(
                            "size-10 rounded-full flex items-center justify-center",
                            vehicle.enabled ? "bg-emerald-500" : "bg-rose-500"
                        )}>
                            <CarFront className="size-5 text-white" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-base font-bold text-muted-foreground flex items-center">
                                    {vehicle.name}
                                </h3>
                                <p className="text-muted-foreground text-xs">
                                    {vehicle.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {vehicle.plate && (
                            <Badge className="items-center justify-center border-2 border-separate border-red-500 text-red-500 bg-slate-200 w-[150px] h-10">
                                {vehicle.plate}
                            </Badge>
                        )}
                    </div>
                    <div className="hidden lg:flex items-center">
                        <span className="text-muted-foreground lowercase">
                            {vehicle.fuel_type}
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <VehicleActions
                        vehicle={vehicle}
                    />
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
                        <Pencil className="size-4 mr-2" />
                        Bewerken
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ConfirmModal onConfirm={() => onRemove()}>
                        <div className="flex items-center">
                            <Trash2 className="size-4 mr-2" />
                            Verwijderen
                        </div>
                    </ConfirmModal>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}