import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllSubstitutionsScreen from '../screens/AllSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const AllStack = createNativeStackNavigator()

function AllSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled })  {
  return(
    <AllStack.Navigator screenOptions={{ headerShown: false}}>
      <AllStack.Screen name="all">
        {props => {
          return(<AllSubstitutionsScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </AllStack.Screen>
      <AllStack.Screen name="Substitution">
        {props => {
          return(<SingleSubstitutionScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </AllStack.Screen>
    </AllStack.Navigator>
  )
}
export default AllSubstitutionsStackScreen