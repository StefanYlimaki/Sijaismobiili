import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { StatusBar } from 'react-native'

import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStackn from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'

const Tab = createMaterialTopTabNavigator()
export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content'/>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen name="Tykätyt" component={SavedSubstitutionsStack} />
          <Tab.Screen name="Sinulle" component={TailoredSubstitutionsStack} />
          <Tab.Screen name="Kaikki" component={AllSubstitutionsStackn} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}