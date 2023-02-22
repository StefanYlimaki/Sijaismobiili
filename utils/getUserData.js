import AsyncStorage from '@react-native-async-storage/async-storage'
import userData from '../assets/data/userData.json'
import { setUserData } from './setUserData'

// This function gets a user object from the device's storage.
// If a user object is saved to the device, return it
// Else save user-object to the device's storage, and return it
export async function getUserData() {
  let user = await AsyncStorage.getItem('user')
  if(user !== null){
    return JSON.parse(user)
  } else {
    setUserData(userData)
    return userData
  }
}
