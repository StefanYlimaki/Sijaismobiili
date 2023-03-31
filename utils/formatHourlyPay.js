export function formatHourlyPay(hourlyPay) {
  const hourlyPayString = hourlyPay.toFixed(2)
  return hourlyPayString.replace('.', ',')
}