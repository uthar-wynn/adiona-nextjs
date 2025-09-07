export function currencyFilter(value: number, digits: number = 2): string {
    return new Intl.NumberFormat("nl-BE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    }).format(value)
}

export function distanceFormatter(value: number): string {
    return value > 0 ? `+ ${value} km` : `${value} km`
}

export function numberFormatter(value: number): string {
    return value.toFixed(2)
}

export function digitFormatter(value: number, digits: number = 2): string {
    return new Intl.NumberFormat("nl-BE", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
        useGrouping: true
    }).format(value)
}

export function integerAwareFormatter(value: number): string {
    return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)
}