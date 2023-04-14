import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'
import { Platform } from 'react-native'

export function formatDate(timestamp) {
  const { locale } = useContext(LocaleContext)

  const date = new Date(timestamp)

  // Can't use toLocaleDateString on android due to ancient JavaScriptCore, therefore:
  if (Platform.OS === 'android') {
    // Fallback
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
  } else {
    return date.toLocaleDateString(locale)
  }
}
