import { format, parse } from "date-fns";

export function convertDate(dado: string): string {
    // Parse da string original para objeto Date
    const dataOriginal = parse(dado, 'HH:mm:ss - dd/MM/yyyy', new Date());
  
    // Formato desejado
    const formatoDesejado = 'yyyy-MM-dd\'T\'HH:mm:ss';
  
    // Formato da data e hora convertida
    const dataHoraConvertida = format(dataOriginal, formatoDesejado);
  
    return dataHoraConvertida;
  }