import { EnrichedFillup } from "@/app/actions/fillups/enrich-fillups"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"

interface FuelItemActionsProps {
    fillup: EnrichedFillup
}

export const FuelItemActions = ({
    fillup
}: FuelItemActionsProps) => {
    const queryClient = useQueryClient()
    const { onOpen } = useModal()

    const { mutate } = useMutation({
        mutationFn: () => axios.delete(`/api/fillups/${fillup.id}`).then(res => res.data),
        onMutate: () => {
            toast.loading("Verwijderen tankbeurt...", { id: "delete-fillup" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fillups", fillup.vehicle_id] })
            toast.success("Tankbeurt is met succes verwijderd!", { id: "delete-fillup" })
        },
        onError: () => {
            toast.error("Er is iets fout gelopen bij verwijderen tankbeurt", { id: "delete-fillup" })
        }
    })

    const onAction = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        onOpen("editFillup", { fillup })

    }, [onOpen, fillup])

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