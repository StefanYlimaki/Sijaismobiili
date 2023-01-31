import React from 'react'


import AllSubstitutionsScreen from '../screens/AllSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AllStack = createNativeStackNavigator()
function AllSubstitutionsStackScreen()  {
  return(
    <AllStack.Navigator screenOptions={{ headerShown: false}}>
      <AllStack.Screen name="all" component={AllSubstitutionsScreen} />
      <AllStack.Screen name="Substitution" component={SingleSubstitutionScreen}/>
    </AllStack.Navigator>
  )
}
export default AllSubstitutionsStackScreen