import React, { useState, useEffect, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllSubstitutionsScreen from './AllSubstitutionsScreen'
import TailoredSubstitutionsScreen from './TailoredSubstitutionsScreen'
import SavedSubstitutionsScreen from './SavedSubstitutionsScreen'
import { View, TouchableOpacity, Animated } from 'react-native'
import TabBar from './TabBar'
import OwnSubstitutionsScreen from './OwnSubstitutionsScreen'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

const Tab = createMaterialTopTabNavigator()

const AppTabs = ({ navigation, route }) => {

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('notification when foregrounded')
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response', response.notification.request.content.data.id)
      navigation.navigate('SingleSubstitution')

    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
  }, [navigation])

  return(
    <Tab.Navigator
      tabBar={props => <TabBar {...props}/>}
      initialRouteName={'Sinulle'}
    >
      <Tab.Screen name="Omat keikat" component={ OwnSubstitutionsScreen } />
      <Tab.Screen name="Sinulle" component={ TailoredSubstitutionsScreen }/>
      <Tab.Screen name="Haku" component={ AllSubstitutionsScreen }/>
    </Tab.Navigator>
  )
}

export default AppTabs
