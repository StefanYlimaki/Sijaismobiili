import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'

export function formatDate(timestamp) {
  const { locale } = useContext(LocaleContext)

  const date = new Date(timestamp)
  return date.toLocaleDateString(locale)
}
