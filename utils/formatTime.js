import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'
import { Platform } from 'react-native'

export function formatTime(timestamp, duration) {
  const { locale } = useContext(LocaleContext)

  const startTime = new Date(timestamp)
  const endTime = new Date(startTime.getTime() + duration*60000)

  // Can't use toLocaleTimeString on android due to ancient JavaScriptCore, therefore:
  if (Platform.OS === 'android') {
    // Fallback
    return startTime.getHours().toString().padStart(2, '0') + '.' + startTime.getMinutes().toString().padStart(2, '0') + '-' + endTime.getHours().toString().padStart(2, '0') + '.' + endTime.getMinutes().toString().padStart(2, '0')
  } else {
    return startTime.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'}) + '-' + endTime.toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'})
  }
}
