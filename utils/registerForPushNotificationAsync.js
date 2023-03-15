

import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

export async function registerForPushNotificationsAsync() {
  let token
  
  // First of all we need to make sure that our device can receive push notifications. (Simulators & Emulators can't)
  if (Device.isDevice) {
  
    // Secondly let's see if the user has given us right to send notifications
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
  
    // If not, let's ask for it
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
  
    // If user doesn't give the permission, we cant send them!
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
  
    // If we have or the user gives us permission to send push notifications, let's grab the token assigned for this device
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }
  
  // On android, there are something called notifications channels. So let's create one just for this application, and let's set the importance to MAX
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }
  
  // return the expo notification token
  return token
}