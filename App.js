import React, {useCallback} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {View, StatusBar, Text, Button} from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStack from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'
import SwipeScreen from './screens/SwipeScreen'
import UserInfoScreen from './screens/UserInfoScreen'
import styles from './assets/styles/styles.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {krGreen} from './assets/styles/colors'

const Tab = createMaterialTopTabNavigator()

const Stack = createNativeStackNavigator()

const CustomStatusBar = (
  {
    backgroundColor,
    barStyle = 'light-content',
    //add more props StatusBar
  }
) => { 
     
  const insets = useSafeAreaInsets()

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle} />
    </View>
  )
}

function AppTabs() {
  return(
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarContentContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          width: 'auto',
          position: 'relative',
        },
        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen name="Tykätyt" component={SavedSubstitutionsStack}/>
      <Tab.Screen name="Sinulle" component={TailoredSubstitutionsStack}/>
      <Tab.Screen name="Haku" component={AllSubstitutionsStack}/>
      <Tab.Screen name="Käyttäjä" component={UserInfoScreen}/>
    </Tab.Navigator>
  )
}

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
          <View style={styles.container}>
            <CustomStatusBar backgroundColor={krGreen} />
            <Stack.Navigator
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
              <Stack.Screen name="MainApplication" component={AppTabs} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
};