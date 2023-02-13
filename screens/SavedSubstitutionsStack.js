import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SavedSubstitutionsScreen from '../screens/SavedSubstitutionsScreen'
import SingleSubstitutionScreen from './SingleSubstitutionScreen'

const SavedStack = createNativeStackNavigator()

function SavedSubstitutionsStackScreen({ navigation, route})  {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === 'Substitution'){
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])

  return(
    <SavedStack.Navigator screenOptions={{ headerShown: false}}>
      <SavedStack.Screen name="saved" component={SavedSubstitutionsScreen} />
      <SavedStack.Screen name="Substitution" component={SingleSubstitutionScreen}/>
    </SavedStack.Navigator>
  )
}

export default SavedSubstitutionsStackScreen