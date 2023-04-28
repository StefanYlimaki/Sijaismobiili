import { getUserData } from './getUserData'
import { setUserData } from './setUserData'
import * as Notifications from 'expo-notifications'

export default async function saveSubstitution (substitution) {
  let userData = await getUserData()
  if (!userData.savedSubstitutions) {
    userData.savedSubstitutions = []
  } 

  userData.savedSubstitutions.push(substitution.id)
  await setUserData(userData)
}