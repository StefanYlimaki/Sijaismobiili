import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'

export function formatTime(timestamp, duration) {
  const { locale } = useContext(LocaleContext)

  const startTime = new Date(timestamp)
  const endTime = new Date(startTime.getTime() + duration*60000)

  return startTime.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'}) + '-' + endTime.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'})
}
