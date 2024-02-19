export function countDecimalPlaces(number: string) {
    const decimalPart = (number.split('.')[1] || '').length
    return decimalPart
}
