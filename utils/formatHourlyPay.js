
export function formatHourlyPay(hourlyPay) {
  const hourlyPayString = String(hourlyPay)
  return hourlyPayString.replace('.', ',')
}


