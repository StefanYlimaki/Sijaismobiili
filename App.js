import React, { useState, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as Localisation from 'expo-localization'
import { I18n } from 'i18n-js'

import CustomStatusBar from './components/CustomStatusBar'
import SwipeScreen from './screens/SwipeScreen/SwipeScreen'
import AppTabs from './screens/MainApplication/AppTabs'
import styles from './assets/styles/styles.js'
import { krGreen } from './assets/styles/colors'
import SingleSubstitutionScreen from './screens/SingleSubstitutionScreen'
import AcceptSubstitutionPopUp from './components/AcceptSubstitutionPopUp'
import { fi, se, en } from './assets/data/localisation/localisations'
import { LocaleContext } from './contexts/LocaleContext'
import { UserInformationStack } from './screens/UserInformation/UserInformationStack'
import SubstitutionCard from './components/SubstitutionCard'
import { getUserData } from './utils'
import { setUserData } from './utils/setUserData'
import UpcomingGigsList from './components/UpcomingGigsList'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

async function addTokenToUserInfo(token) {
  const user = await getUserData()
  user.token = token
  await setUserData(user)
}

const Stack = createNativeStackNavigator()

const AppTheme = {
  dark: false,
  colors: {
    primary: krGreen,
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}

const i18n = new I18n() //For localisation

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token)
    })

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  useEffect(() => {
    addTokenToUserInfo(expoPushToken)
  }, [expoPushToken])

  //Localisation
  const [locale, setLocale] = useState(Localisation.locale) // use system language
  i18n.enableFallback = true
  i18n.defaultLocale = 'fi'
  i18n.translations = { fi, se, en }
  i18n.locale = locale

  const [loaded] = useFonts({
    'Figtree-ExtraBold': require('./assets/styles/fonts/Figtree-ExtraBold.ttf',),
    'Inter-DisplayBlack': require('./assets/styles/fonts/Inter-DisplayBlack.ttf',),
    'Inter-DisplayBold': require('./assets/styles/fonts/Inter-DisplayBold.ttf',),
    'Inter-DisplayExtraBold': require('./assets/styles/fonts/Inter-DisplayExtraBold.ttf',),
    'Inter-DisplayExtraLight': require('./assets/styles/fonts/Inter-DisplayExtraLight.ttf',),
    'Inter-DisplayLight': require('./assets/styles/fonts/Inter-DisplayLight.ttf',),
    'Inter-DisplayMedium': require('./assets/styles/fonts/Inter-DisplayMedium.ttf',),
    'Inter-DisplayMediumItalic': require('./assets/styles/fonts/Inter-DisplayMediumItalic.ttf',),
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
          <NavigationContainer theme={ AppTheme }>
            <View style={ styles.container }>
              <CustomStatusBar backgroundColor={ krGreen } />
              <Stack.Navigator
                screenOptions={{headerShown: false
                }}
                mode="modal"
              >
                <Stack.Screen name="SwipeScreen" component={ SwipeScreen } options={{ presentation: 'transparentModal', headerShown: false }} />
                <Stack.Screen name="MainApplication" component={ AppTabs } />
                <Stack.Screen name="UserInfoScreen" component={ UserInformationStack } />
                <Stack.Screen name="SingleSubstitution" component={ SingleSubstitutionScreen } />
                <Stack.Screen name='SubstitutionCard' component={SubstitutionCard} options={{ presentation: 'transparentModal', headerShown: false }}/>
                <Stack.Screen name="ConfirmSubstitution" component={AcceptSubstitutionPopUp} options={{ presentation: 'transparentModal', headerShown: false}}/>
                <Stack.Screen name="UpcomingGigsList" component={UpcomingGigsList} options={{ presentation: 'transparentModal', headerShown: false}}/>
              </Stack.Navigator>
            </View>
          </NavigationContainer>
        </LocaleContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export {LocaleContext}
