import { getUserData } from './getUserData'
import { logUserData } from './logUserData'
import { setUserData } from './setUserData'

export default async function acceptSubstitution (substitutionId) {
  let userData = await getUserData()
  if (!userData.substitutions) {
    userData.substitutions = []
  } 
  userData.substitutions.push(substitutionId)
  await setUserData(userData)
}