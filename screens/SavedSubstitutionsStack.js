import React, { useEffect } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SavedSubstitutionsScreen from '../screens/SavedSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const SavedStack = createNativeStackNavigator()

function SavedSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden})  {
  if(tabBarHidden){
    setTabBarHidden(false)
  }
  return(
    <SavedStack.Navigator screenOptions={{ headerShown: false}}>
      <SavedStack.Screen name="saved" component={SavedSubstitutionsScreen} />
      <SavedStack.Screen name="Substitution">
        {props => <SingleSubstitutionScreen setTabBarHidden={setTabBarHidden} {...props}/>}
      </SavedStack.Screen>
    </SavedStack.Navigator>
  )
}

export default SavedSubstitutionsStackScreen