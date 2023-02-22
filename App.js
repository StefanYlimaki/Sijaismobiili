import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import CustomStatusBar from './screens/CustomStatusBar'
import SwipeScreen from './screens/SwipeScreen'
import AppTabs from './screens/AppTabs'
import UserTabs from './screens/UserTabs'

import styles from './assets/styles/styles.js'
import { krGreen } from './assets/styles/colors'
import SingleSubstitutionScreen from './screens/SingleSubstitutionScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const [loaded] = useFonts({
    'Inter-DisplayBlack': require('./assets/styles/fonts/Inter-DisplayBlack.ttf',),
    'Inter-DisplayBold': require('./assets/styles/fonts/Inter-DisplayBold.ttf',),
    'Inter-DisplayExtraBold': require('./assets/styles/fonts/Inter-DisplayExtraBold.ttf',),
    'Inter-DisplayExtraLight': require('./assets/styles/fonts/Inter-DisplayExtraLight.ttf',),
    'Inter-DisplayLight': require('./assets/styles/fonts/Inter-DisplayLight.ttf',),
    'Inter-DisplayMedium': require('./assets/styles/fonts/Inter-DisplayMedium.ttf',),
    'Inter-Display': require('./assets/styles/fonts/Inter-Display.ttf',),
    'Inter-DisplaySemiBold': require('./assets/styles/fonts/Inter-DisplaySemiBold.ttf',),
    'Inter-DisplayThin': require('./assets/styles/fonts/Inter-DisplayThin.ttf',),
  })

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={ styles.container }>
            <CustomStatusBar backgroundColor={ krGreen } />
            <Stack.Navigator
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="SwipeScreen" component={ SwipeScreen } />
              <Stack.Screen name="MainApplication" component={ AppTabs } />
              <Stack.Screen name="UserInfoScreen" component={ UserTabs } />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}




