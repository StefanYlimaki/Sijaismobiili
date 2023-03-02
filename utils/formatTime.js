export function formatTime(timestamp, duration) {
  const startTime = new Date(timestamp)
  const endTime = new Date(startTime.getTime() + duration*60000)

  return startTime.getHours().toString().padStart(2, '0') + ':' + startTime.getMinutes().toString().padStart(2, '0') + '-' + endTime.getHours().toString().padStart(2, '0') + ':' + endTime.getMinutes().toString().padStart(2, '0')
}