export function countDecimalPlaces(number: string) {
    const decimalPart = (number.toString().split('.')[1] || '').length

    return decimalPart
}
