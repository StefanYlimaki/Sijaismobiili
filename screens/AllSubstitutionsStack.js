import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import AllSubstitutionsScreen from '../screens/AllSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const AllStack = createNativeStackNavigator()

function AllSubstitutionsStackScreen({ navigation, route })  {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === 'Substitution'){

      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])
  
  return(
    <AllStack.Navigator screenOptions={{ headerShown: false}}>
      <AllStack.Screen name="all" component={AllSubstitutionsScreen} />
    </AllStack.Navigator>
  )
}
export default AllSubstitutionsStackScreen