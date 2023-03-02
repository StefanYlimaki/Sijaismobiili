export function formatTime(timestamp, duration) {
  const startTime = new Date(timestamp)
  const endTime = new Date(startTime.getTime() + duration*60000)

  // TODO: take user locale into consideration
  return startTime.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' }) + '-' + endTime.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })
}