import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import TailoredSubsitutionsScreen from './TailoredSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const TailoredStack = createNativeStackNavigator()

function TailoredSubstitutionsStackScreen({ navigation, route })  {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === 'Substitution'){
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])

  return(
    <TailoredStack.Navigator screenOptions={{ headerShown: false}}>
      <TailoredStack.Screen name="tailored" component={TailoredSubsitutionsScreen} />
      <TailoredStack.Screen name="Substitution" component={SingleSubstitutionScreen}/>
    </TailoredStack.Navigator>
  )
}

export default TailoredSubstitutionsStackScreen