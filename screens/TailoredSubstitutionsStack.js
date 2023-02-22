import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TailoredSubsitutionsScreen from './TailoredSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const TailoredStack = createNativeStackNavigator()

function TailoredSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled })  {
  return(
    <TailoredStack.Navigator screenOptions={{ headerShown: false}}>
      <TailoredStack.Screen name="tailored">
        {props => {
          return(<TailoredSubsitutionsScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </TailoredStack.Screen>
      <TailoredStack.Screen name="Substitution">
        {props => {
          return(<SingleSubstitutionScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </TailoredStack.Screen>
    </TailoredStack.Navigator>
  )
}

export default TailoredSubstitutionsStackScreen