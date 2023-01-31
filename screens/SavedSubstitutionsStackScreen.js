import React from 'react'

import SavedSubstitutions from '../screens/SavedSubstitutions'
import SubstitutionScreen from '../components/SubstitutionScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const SavedStack = createNativeStackNavigator()

function SavedSubstitutionsStackScreen()  {
  return(
    <SavedStack.Navigator screenOptions={{ headerShown: false}}>
      <SavedStack.Screen name="saved" component={SavedSubstitutions} />
      <SavedStack.Screen name="Substitution" component={SubstitutionScreen}/>
    </SavedStack.Navigator>
  )
}

export default SavedSubstitutionsStackScreen