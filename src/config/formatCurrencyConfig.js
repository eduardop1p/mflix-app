export default function formatCurrency(value) {
  const format = new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    compactDisplay: 'long',
  });
  return format.format(Number(value));
}
