import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SavedSubstitutionsScreen from '../screens/SavedSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const SavedStack = createNativeStackNavigator()

function SavedSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled })  {
  return(
    <SavedStack.Navigator screenOptions={{ headerShown: false}}>
      <SavedStack.Screen name="saved">
        {props => {
          return(<SavedSubstitutionsScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </SavedStack.Screen>
      <SavedStack.Screen name="Substitution">
        {props => {
          return(<SingleSubstitutionScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </SavedStack.Screen>
    </SavedStack.Navigator>
  )
}

export default SavedSubstitutionsStackScreen