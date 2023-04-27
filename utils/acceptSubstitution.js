import { getUserData } from './getUserData'
import { setUserData } from './setUserData'
import * as Notifications from 'expo-notifications'

export default async function acceptSubstitution (substitution) {
  const substitutionStartTime = new Date(substitution.timing.startTime)
  const now = new Date()
  if(now.getTime() > substitutionStartTime.getTime()){
    alert('Et voi kiinnittäytyä jo alkaneeseen vuoroon!')
  } else {
    // The following variable could be used, if wanted. Now, however the notification is always to three seconds into the future.
    const differenceInSeconds = (substitutionStartTime.getTime() - now.getTime()) / 1000

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Työvuorosi alkaa pian!',
        body: `Työvuorosi ${substitution.title} on alkamassa. Klikkaa tästä nähdäksesi tiedot!`,
        data: { id: substitution.id},
      },
      trigger: { seconds: 3 /*(differenceInSeconds) - 3600*/ }
    })

    let userData = await getUserData()
    if (!userData.substitutions) {
      userData.substitutions = []
    } 
    userData.substitutions.push(substitution.id)
    await setUserData(userData)
  }  
}

  
