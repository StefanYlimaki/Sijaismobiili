import React from 'react'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import UserInfoScreen from './UserInfoScreen'
import UserPreferencesScreen from './UserPreferencesScreen'
import SwitchSelector from 'react-native-switch-selector'
import {krGreen} from '../assets/styles/colors'

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
        swipeEnabled: false,
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
  // <SwitchSelector
  //     buttonMargin={5}
  //     buttonColor={krGreen}
  //     initial={1}
  //     onPress={(e) => setIndex(e)}
  // />
  )
}

export default UserInfoTab