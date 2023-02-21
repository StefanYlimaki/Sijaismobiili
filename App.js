import React, {useCallback, useState, createContext} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {View, StatusBar, Text, Button, TouchableOpacity, StyleSheet} from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {krGreen} from './assets/styles/colors'

import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStack from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'
import UserTabs from './screens/UserTabs'
import SwipeScreen from './screens/SwipeScreen'
import styles from './assets/styles/styles.js'

import { fi, se, en } from './assets/data/localisation/localisations'
import * as Localisation from 'expo-localization'
import {I18n} from 'i18n-js'

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
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
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
      <Tab.Screen name="Tykätyt" component={SavedSubstitutionsStack} options={{  }}/>
      <Tab.Screen name="Sinulle" component={TailoredSubstitutionsStack}/>
      <Tab.Screen name="Haku" component={AllSubstitutionsStack}/>
    </Tab.Navigator>
  )
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={NavBarStyles.topBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const { options } = descriptors[route.key]

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            testID={options.tabBarTestID}
            accessibilityRole="button"
          >
            <TopTab
              index={index}
              isFocused={isFocused}
              size={24}
              navigation={navigation}
            />
          </TouchableOpacity>
        )
      })}
      <View>
        <Button title='käyttäjä' onPress={() => { navigation.navigate('UserInfoScreen') }}></Button>
      </View>
    </View>
  )
}

const TopTab = ({ type, size = 24, isFocused, index, navigation }) => {
  switch(index) {
  case 0:
    return(<View><Text>Tykätyt</Text></View>)
  case 1:
    return(<View><Text>Sinulle</Text></View>)
  case 2:
    return(<View><Text>Haku</Text></View>)
  }
}

const AppTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}

const i18n = new I18n() //For localisation
const LocaleContext = createContext(null)

export default function App() {

  //Localisation
  const [locale, setLocale] = useState(Localisation.locale) // use system language
  i18n.enableFallbacks = true
  i18n.translations = { fi, se, en }
  i18n.locale = locale

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
        <LocaleContext.Provider value={{ i18n, locale, setLocale }}>
          <NavigationContainer theme={AppTheme}>
            <View style={styles.container}>
              <CustomStatusBar backgroundColor={krGreen} />
              <Stack.Navigator
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
                <Stack.Screen name="MainApplication" component={AppTabs} />
                <Stack.Screen name="UserInfoScreen" component={UserTabs} />
              </Stack.Navigator>
            </View>
          </NavigationContainer>
        </LocaleContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const NavBarStyles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
  },
})

export {LocaleContext}
