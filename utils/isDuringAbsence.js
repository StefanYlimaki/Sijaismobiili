import { getUserData } from './getUserData'

/* 
 * Checks if a given substitution starts during a time
 * the user has marked themselves as not available.
 * Return a boolean accordingly
 */
export default async function isDuringAbsence(substitution) {
  const user = await getUserData()

  const availability = [
    {
      startDate: '2022-04-28T09:21:29Z',
      endDate: '2024-04-28T09:21:29Z',
      recurring: [-1]
    }
  ]

  for (item of availability) {
    const startDate = new Date(item.startDate)
    const substDate = new Date(substitution.timing.startTime)
    // Parse out the hours for easier comparisons
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
    substDate = new Date(substDate.getFullYear(), substDate.getMonth(), substDate.getDate())

    if(item.recurring[0] === -1) { // If no recurring weekly absences
      // If no end date set (day long absence)
      if(item.endDate === '-') {
        return (startDate.getTime() === substDate.getTime())
      }
      // If user has given a time range
      const endDate = new Date(item.endDate)
      endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      return (startDate.getTime() <= substDate.getTime() && endDate.getTime() >= substDate.getTime())
    } else { // User has set a recurring weekly absence

      // If it keeps going indefinitely
      if(item.endDate === '-') {
        return (item.recurring.includes(substDate.getDay()))
      }

      // If an end date has been set
      const endDate = new Date(item.endDate)
      endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
      return (item.recurring.includes(substDate.getDay()) && substDate <= endDate)
    }
  }
  
}