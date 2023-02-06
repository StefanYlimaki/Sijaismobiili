import React, {useCallback} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {View, StatusBar} from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStack from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'
import UserInfoScreen from './screens/UserInfoScreen'
import styles from './assets/styles/styles.js'
import colors, { krGreen } from './assets/styles/colors'
import { useFonts } from 'expo-font'

const Tab = createMaterialTopTabNavigator()

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
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={krGreen} />
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
            <Tab.Screen name="Tailored" component={TailoredSubstitutionsStack} options={{ title: 'Sinulle' }}/>
            <Tab.Screen name="Kaikki" component={AllSubstitutionsStack}/>
            <Tab.Screen name="Käyttäjä" component={UserInfoScreen}/>
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  )
};