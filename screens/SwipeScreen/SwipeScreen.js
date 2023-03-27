
import React, { useState, useEffect, useRef } from 'react'
import {View, Text, Button, Pressable, Alert} from 'react-native'
import RecommendationView from './RecommendationView'
import { krGreen } from '../../assets/styles/colors'
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import * as Updates from 'expo-updates'

import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationAsync'
import { addTokenToUserData } from '../../utils/addTokenToUserData'

import substitutions from '../../assets/data/substitutionsData_new.json'

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error }) => {
  console.log('notification was received when the app was backgrounded')
})

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
})

const handleClick = () => {
  registerForPushNotificationsAsync().then(token => {
    addTokenToUserData(token)
    if(token){
      Alert.alert('otsikko', `${token}`)
    }
    if(!token){
      Alert.alert('otsikko','no token')
    }
  })
}


const SwipeScreen = ({ navigation }) => {
  const responseListener = useRef()
  const notificationListener = useRef()

  useEffect(() => {

    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)

    // This is handler for notifications when app is open.
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification', notification)
    })

    // This is handler for notifications clicked on when the app is open.
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('ID receiver from notification: ', response.notification.request.content.data.id)
      const sub = substitutions.find(s => s.id === response.notification.request.content.data.id)
      console.log(sub)
      navigation.navigate('SingleSubstitution', {
        substitution: substitutions.find(s => s.id === response.notification.request.content.data.id),
        navigation: navigation
      })
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

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
      <Pressable onPress={() => handleClick()}>
        <View style={{ backgroundColor: 'green', padding: 30 }}><Text>alert</Text></View>
      </Pressable>
    </View>
  )
}

export default SwipeScreen