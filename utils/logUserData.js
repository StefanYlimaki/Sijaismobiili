import AsyncStorage from '@react-native-async-storage/async-storage'
import userData from '../assets/data/userData.json'

export async function logUserData() {
  let user = await AsyncStorage.getItem('user')
  if(user !== null){
    console.log(JSON.parse(user))
  } else {
    console.log(userData)
  }
}