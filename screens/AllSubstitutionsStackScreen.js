import React from 'react'


import AllSubstitutions from '../screens/AllSubstitutions'
import SubstitutionScreen from '../components/SubstitutionScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AllStack = createNativeStackNavigator()
function AllSubstitutionsStackScreen()  {
  return(
    <AllStack.Navigator screenOptions={{ headerShown: false}}>
      <AllStack.Screen name="all" component={AllSubstitutions} />
      <AllStack.Screen name="Substitution" component={SubstitutionScreen}/>
    </AllStack.Navigator>
  )
}
export default AllSubstitutionsStackScreen