import AsyncStorage from '@react-native-async-storage/async-storage'
import userData from '../assets/data/userData.json'

export async function getUserData() {
  let user = await AsyncStorage.getItem('user')
  if(user !== null){
    console.log('user is', user)
  } else {
    user = await AsyncStorage.setItem('user', userData)
    console.log(user)
  }
}
