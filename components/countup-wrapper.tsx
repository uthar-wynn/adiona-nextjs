"use client"

import { useEffect, useState } from "react";
import CountUp from "react-countup";

export const CountUpWrapper = ({ value, decimals = 2 }: { value: number, decimals?: number }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return "-"

    return <CountUp
        duration={0.6}
        preserveValue end={value}
        decimals={decimals}
        decimal=","
        separator=""
    />
}