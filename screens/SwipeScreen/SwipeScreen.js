
import React, { useState, useEffect, useRef } from 'react'
import {View, Text, Button, Pressable} from 'react-native'
import RecommendationView from './RecommendationView'
import { krGreen } from '../../assets/styles/colors'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

import { getUserData } from '../../utils'
import { setUserData } from '../../utils/setUserData'

import substitutions from '../../assets/data/substitutionsData_new.json'

Notifications.setNotificationHandler({ 
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

async function registerForPushNotificationsAsync() {
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

async function addTokenToUserInfo(token) {
  const user = await getUserData()
  user.token = token
  await setUserData(user)
}


const SwipeScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState('')
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      navigation.navigate('SingleSubstitution', {
        substitution: substitutions.find(s => s.id === response.notification.request.content.data.id),
        navigation: navigation
      })
    })

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  useEffect(() => {
    addTokenToUserInfo(expoPushToken)
  }, [expoPushToken])

  return(
    <View>
      <RecommendationView/>
      <Pressable
        onPress={() => navigation.navigate('MainApplication')}
      >
        <View style={{
          padding: 20,
          backgroundColor: krGreen,
          borderRadius: 20
        }}
        >
          <Text style={{
            color: 'white'
          }}>
            Selaan räätälöityjä suosituksia taas huomenna
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default SwipeScreen