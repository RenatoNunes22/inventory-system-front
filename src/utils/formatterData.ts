export function formatarData(dataString: string): string {
  const data = new Date(dataString);

  const horas = `0${data.getUTCHours()}`.slice(-2);
  const minutos = `0${data.getUTCMinutes()}`.slice(-2);
  const segundos = `0${data.getUTCSeconds()}`.slice(-2);

  const dia = `0${data.getUTCDate()}`.slice(-2);
  const mes = `0${data.getUTCMonth() + 1}`.slice(-2);
  const ano = data.getUTCFullYear();

  const horaFormatada = `${horas}:${minutos}:${segundos}`;
  const dataFormatada = `${dia}/${mes}/${ano}`;

  return `${horaFormatada} - ${dataFormatada}`;
}
