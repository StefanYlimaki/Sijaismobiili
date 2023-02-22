import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import TailoredSubsitutionsScreen from './TailoredSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const TailoredStack = createNativeStackNavigator()

function TailoredSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden })  {
  return(
    <TailoredStack.Navigator screenOptions={{ headerShown: false}}>
      <TailoredStack.Screen name="tailored" component={TailoredSubsitutionsScreen} />
      <TailoredStack.Screen name="Substitution">
        {props => <SingleSubstitutionScreen  setTabBarHidden={setTabBarHidden} {...props}/>}
      </TailoredStack.Screen>
    </TailoredStack.Navigator>
  )
}

export default TailoredSubstitutionsStackScreen