import AsyncStorage from '@react-native-async-storage/async-storage'

// This function saves a user object to the device's storage.
// The user parameter can be passed to this function in string or object format.
export async function setUserData(user) {
  if(typeof(user) !== 'string'){
    user = JSON.stringify(user) //Stringifying the object before saving
  }
  await AsyncStorage.setItem('user', user)
  await AsyncStorage.setItem('updatedAt', Date.now().toString())
  return
}
