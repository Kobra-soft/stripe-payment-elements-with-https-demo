export default function converToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
