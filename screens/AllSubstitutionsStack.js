import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import AllSubstitutionsScreen from '../screens/AllSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const AllStack = createNativeStackNavigator()

function AllSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden })  {
  return(
    <AllStack.Navigator screenOptions={{ headerShown: false}}>
      <AllStack.Screen name="all">
        {props => <AllSubstitutionsScreen  setTabBarHidden={setTabBarHidden} {...props}/>}
      </AllStack.Screen>
      <AllStack.Screen name="Substitution">
        {props => <SingleSubstitutionScreen  setTabBarHidden={setTabBarHidden} {...props}/>}
      </AllStack.Screen>
    </AllStack.Navigator>
  )
}
export default AllSubstitutionsStackScreen