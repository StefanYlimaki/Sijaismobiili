import React, { useState, useEffect, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllSubstitutionsScreen from './AllSubstitutionsScreen'
import TailoredSubstitutionsScreen from './TailoredSubstitutionsScreen'
import SavedSubstitutionsScreen from './SavedSubstitutionsScreen'
import { View, TouchableOpacity, Animated } from 'react-native'
import TabBar from './TabBar'
import OwnSubstitutionsScreen from './OwnSubstitutionsScreen'
import * as Notifications from 'expo-notifications'

import substitutions from '../../assets/data/substitutionsData_new.json'

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
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {})

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const substitution = substitutions.find(s => s.id === response.notification.request.content.data.id)
      navigation.navigate('SingleSubstitution', { substitution: substitution})
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
      <Tab.Screen accessibilityRole='button' name="Omat keikat" component={ OwnSubstitutionsScreen } />
      <Tab.Screen accessibilityRole='button' name="Sinulle" component={ TailoredSubstitutionsScreen }/>
      <Tab.Screen accessibilityRole='button' name="Haku" component={ AllSubstitutionsScreen }/>
    </Tab.Navigator>
  )
}

export default AppTabs
