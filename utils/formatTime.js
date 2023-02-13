export function formatTime(timestamp, duration) {
  const startTime = new Date(timestamp)
  const endTime = new Date(startTime.getTime() + duration*60000)

  return (startTime.getHours() + ':' + startTime.getMinutes() + '-' + endTime.getHours() + ':' + endTime.getMinutes())
}