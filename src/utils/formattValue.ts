export function formattValue(number: string) {
    let value = number.replace(/,/g, '.')
    const pontoIndex = value.indexOf('.')
    if (pontoIndex !== -1 && value.indexOf('.', pontoIndex + 1) !== -1) {
        value = value.replace('.', '')
    }
    return value
}
