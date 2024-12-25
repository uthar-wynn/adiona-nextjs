import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
import { Costs } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"

interface Props {
    cost: Costs
}

export const CostItemActions = ({
    cost
}: Props) => {
    const queryClient = useQueryClient()
    const { onOpen } = useModal()

    const { mutate } = useMutation({
        mutationFn: () => axios.delete(`/api/costs/${cost.id}`).then(res => res.data),
        onMutate: () => {
            toast.loading("Verwijderen kost...", { id: "delete-cost" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["costs", cost.vehicle_id] })
            toast.success("Kost is met succes verwijderd!", { id: "delete-cost" })
        },
        onError: () => {
            toast.error("Er is iets fout gelopen bij verwijderen kost", { id: "delete-cost" })
        }
    })

    const onAction = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        onOpen("editCost", { cost })

    }, [onOpen, cost])

    const onRemove = useCallback(() => {
        mutate()
    }, [mutate])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical className="size-6 text-zinc-500" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
                <DropdownMenuItem onClick={(e) => onAction(e)}>
                    <div className="flex items-center">
                        <Pencil className="size-4 mr-2" />
                        Bewerken
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ConfirmModal onConfirm={onRemove}>
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