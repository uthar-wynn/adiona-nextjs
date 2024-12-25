import { Fillup } from "@prisma/client"

export const useFillup = (fillups: Fillup[]) => {

    const lastFillup = fillups ? fillups[0] : undefined

    const lastIndex = fillups ? fillups.findIndex(fillups => fillups.id === lastFillup?.id) : 0

    const previousFillup = fillups ? fillups[lastIndex + 1] : null

    return {
        lastFillup,
        previousFillup
    }
}