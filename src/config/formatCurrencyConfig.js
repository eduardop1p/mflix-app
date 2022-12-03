export default function formatCurrency(value) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return format.format(Number(value));
}
