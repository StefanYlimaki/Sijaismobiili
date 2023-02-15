import React from 'react'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import UserInfoScreen from './UserInfoScreen'
import UserPreferencesScreen from './UserPreferencesScreen'

const Tab = createMaterialTopTabNavigator()

function UserInfoTab({ navigation, route })  {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === 'Substitution'){
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])

  return(
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarContentContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          width: 'auto',
          position: 'relative',
        },
        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen name="Mieltymykset" component={UserPreferencesScreen}/>
      <Tab.Screen name="Omat tiedot" component={UserInfoScreen}/>
    </Tab.Navigator>
  )
}

export default UserInfoTab