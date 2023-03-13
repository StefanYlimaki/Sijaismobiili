
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
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

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
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
      console.log(substitutions[0])
      navigation.navigate('SingleSubstitution', {
        substitution: substitutions[0],
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