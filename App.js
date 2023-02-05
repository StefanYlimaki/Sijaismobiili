import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { View, StatusBar } from 'react-native'
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'

import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStack from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'
import UserInfoScreen from './screens/UserInfoScreen'
import styles from './assets/styles/styles.js'
import colors, { krGreen } from './assets/styles/colors'

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
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={krGreen} />
        <NavigationContainer>
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
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  )
};