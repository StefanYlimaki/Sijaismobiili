
import { getUserData } from './getUserData'
import { setUserData } from './setUserData'

export async function addTokenToUserData(token) {
  const user = await getUserData()
  user.token = token
  await setUserData(user)
}