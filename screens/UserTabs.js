import React, { useContext } from 'react'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import UserInfoScreen from './UserInfoScreen'
import UserPreferencesScreen from './UserPreferencesScreen'
import SettingsScreen from './SettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LocaleContext } from '../contexts/LocaleContext'

const Tab = createMaterialTopTabNavigator()

const UserInfoStack = createNativeStackNavigator()

function UserInfoStackScreen() {
  const { i18n } = useContext(LocaleContext)
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen name="UserInfo" component={UserInfoScreen} options={{headerShown: false}}/>
      <UserInfoStack.Screen name="Settings" component={SettingsScreen} options={{headerTitle: i18n.t('settings'), headerBackTitleVisible: false}}/>
    </UserInfoStack.Navigator>
  )
}

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
      <Tab.Screen name="Omat tiedot" component={UserInfoStackScreen}/>
    </Tab.Navigator>
  )
}

export default UserInfoTab