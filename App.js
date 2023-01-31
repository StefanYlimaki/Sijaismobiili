import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar } from 'react-native'

import SavedSubstitutionsStackScreen from './screens/SavedSubstitutionsStackScreen'
import AllSubstitutionsStackScreen from './screens/AllSubstitutionsStackScreen'
import TailoredSubstitutionsStackScreen from './screens/TailoredSubstitutionsStackScreen'

const Tab = createMaterialTopTabNavigator()
export default function App() {
  return (
    <>
      <StatusBar barStyle={'light-content'}/>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen name="Tykätyt" component={SavedSubstitutionsStackScreen} />
          <Tab.Screen name="Sinulle" component={TailoredSubstitutionsStackScreen} />
          <Tab.Screen name="Kaikki" component={AllSubstitutionsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}