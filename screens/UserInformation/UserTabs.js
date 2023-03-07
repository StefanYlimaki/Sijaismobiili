import React, { useContext } from 'react'
import TabBar from './UserTabBar'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import UserInfoScreen from './UserInfoScreen'
import UserPreferencesScreen from './UserPreferencesScreen'
import SettingsScreen from './SettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LocaleContext } from '../../contexts/LocaleContext'
import PopupDialog from '../../components/PopupDialog'
import { View, Text, Pressable, TouchableOpacity, Animated } from 'react-native'
import styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'



const Tab = createMaterialTopTabNavigator()

function UserTabs({ navigation, route })  {
  return(
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props}/>}
    >
      <Tab.Screen name="Mieltymykset" component={UserPreferencesScreen}/>
      <Tab.Screen name="Omat tiedot" component={UserInfoScreen}/>
    </Tab.Navigator>
  )
}

export default UserTabs
