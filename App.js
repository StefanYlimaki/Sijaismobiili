import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SubstitutionsScreen from './components/SubstitutionsScreen'
import SubstitutionScreen from './components/SubstitutionScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Substitutions"
          component={SubstitutionsScreen}
          options={{ title: 'Avoimet sijaisuudet' }}
        />
        <Stack.Screen
          name="Substitution"
          component={SubstitutionScreen}
          options={{ title: 'Sijaisuus' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}