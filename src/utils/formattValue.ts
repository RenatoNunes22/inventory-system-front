export function formattValue(value: string): string {
    const newValor = value.slice(2)
    const partes = newValor.split(',').map((parte) => parte.replace('.', ''))
    const result = partes.join('.')
    return result
}
