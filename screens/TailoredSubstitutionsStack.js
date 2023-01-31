import React from 'react'

import TailoredSubsitutionsScreen from './TailoredSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const TailoredStack = createNativeStackNavigator()
function TailoredSubstitutionsStackScreen()  {
  return(
    <TailoredStack.Navigator screenOptions={{ headerShown: false}}>
      <TailoredStack.Screen name="tailored" component={TailoredSubsitutionsScreen} />
      <TailoredStack.Screen name="Substitution" component={SingleSubstitutionScreen}/>
    </TailoredStack.Navigator>
  )
}

export default TailoredSubstitutionsStackScreen