import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Localisation from 'expo-localization'
import { I18n } from 'i18n-js'
import CustomStatusBar from './components/CustomStatusBar'
import SwipeScreen from './screens/SwipeScreen/SwipeScreen'
import AppTabs from './screens/MainApplication/AppTabs'
import styles from './assets/styles/styles.js'
import SingleSubstitutionScreen from './screens/SingleSubstitutionScreen'
import AcceptSubstitutionPopUp from './components/AcceptSubstitutionPopUp'
import { fi, se, en } from './assets/data/localisation/localisations'
import { LocaleContext } from './contexts/LocaleContext'
import { UserInformationStack } from './screens/UserInformation/UserInformationStack'
import SubstitutionCard from './components/SubstitutionCard'
import UpcomingGigsList from './components/UpcomingGigsList'
import {colors} from './assets/styles/colors'
import GigConfirmedPopup from './components/GigConfirmedPopup'
import OnboardingScreen from './screens/Onboarding/OnboardingScreen'
import { getUserData } from './utils'

const Stack = createNativeStackNavigator()

const AppTheme = {
  dark: false,
  colors: {
    primary: colors.krGreen,
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
}

const i18n = new I18n() //For localisation

export default function App() {
  const [loading, setLoading] = useState(true)
  const [initialRouteName, setInitialRouteName] = useState('SwipeScreen')
  const [user, setUser] = useState()

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setUser(user)
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    if(user){
      if(user.firstname === ''){
        setInitialRouteName('OnboardingScreen')
        setLoading(false)
      } else if (user.firstname !== ''){
        setLoading(false)
      }
    }
  }, [user])

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

  if(!loaded) {
    return null
  }

  if(loading){
    return(
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator size="large" color= {colors.krBlue} />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LocaleContext.Provider value={{ i18n, locale, setLocale }}>
          <NavigationContainer theme={ AppTheme }>
            <View style={ styles.container }>
              <CustomStatusBar backgroundColor={ colors.krGreen } />
              <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{ headerShown: false }}
                
                mode="modal"
              >
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
                <Stack.Screen name="SwipeScreen" component={ SwipeScreen } options={{ presentation: 'transparentModal', headerShown: false }} />
                <Stack.Screen name="MainApplication" component={ AppTabs } />
                <Stack.Screen name="UserInfoScreen" component={ UserInformationStack } />
                <Stack.Screen name="SingleSubstitution" component={ SingleSubstitutionScreen } />
                <Stack.Screen name='SubstitutionCard' component={SubstitutionCard} options={{ presentation: 'transparentModal', headerShown: false }}/>
                <Stack.Screen name="ConfirmSubstitution" component={AcceptSubstitutionPopUp} options={{ presentation: 'transparentModal', headerShown: false}}/>
                <Stack.Screen name="UpcomingGigsList" component={UpcomingGigsList} options={{ headerShown: true, title: 'Kaikki tulevat keikat' }}/>
                <Stack.Screen name="GigConfirmedPopup" component={GigConfirmedPopup}/>
              </Stack.Navigator>
            </View>
          </NavigationContainer>
        </LocaleContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export {LocaleContext}
