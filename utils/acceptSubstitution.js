import { getUserData } from './getUserData'
import { setUserData } from './setUserData'
import * as Notifications from 'expo-notifications'

export default async function acceptSubstitution (substitution) {
  const substitutionStartTime = new Date(substitution.timing.startTime)
  const now = new Date()
  console.log('käyttäjä kiinnittäytyy sijaisuuteen, joka alkaa', substitutionStartTime.getDate() + '.' + substitutionStartTime.getMonth() + 1 + '.' + substitutionStartTime.getFullYear(), 'kello:', substitutionStartTime.getHours() + '.' + substitutionStartTime.getMinutes() + '.' + substitutionStartTime.getSeconds())
  console.log('nyt on', now.getDate() + '.' + now.getMonth() + 1 + '.' + now.getFullYear(), 'kello:', now.getHours() + '.' + now.getMinutes() + '.' + now.getSeconds())

  if(now.getTime() > substitutionStartTime.getTime()){
    alert('Et voi kiinnittäytyä jo alkaneeseen vuoroon!')
  } else {
    const differenceInSeconds = (substitutionStartTime.getTime() - now.getTime()) / 1000

    console.log('difference in seconds', differenceInSeconds)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Työvuorosi alkaa pian!',
        body: `Työvuorosi ${substitution.title} on alkamassa. Klikkaa tästä nähdäksesi tiedot!`
      },
      data: {'id': substitution.id},
      trigger: { seconds: (differenceInSeconds) - 3600 }
    })

    let userData = await getUserData()
    if (!userData.substitutions) {
      userData.substitutions = []
    } 
    userData.substitutions.push(substitution.id)
    await setUserData(userData)
  }  
}

  
