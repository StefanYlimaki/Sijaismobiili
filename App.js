import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SubstitutionsScreen from './components/SubstitutionsScreen'
import ProfileScreen from './components/ProfileScreen'
import SubstitutionScreen from './components/SubstitutionScreen'

import substitutions from './assets/data/substitutionsData.json'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Substitutions"
          component={SubstitutionsScreen}
          options={{ title: 'Avoimet sijaisuudet' }}
          initialParams={{ 'substitutions': substitutions }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Substitution"
          component={SubstitutionScreen}
          options={{ title: 'Sijaisuus' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}