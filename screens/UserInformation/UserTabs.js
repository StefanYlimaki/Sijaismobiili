import React from 'react'
import TabBar from './UserTabBar'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import UserInfoScreen from './UserInfoScreen'
import UserPreferencesScreen from './UserPreferencesScreen'



const Tab = createMaterialTopTabNavigator()

function UserTabs({ navigation, route })  {
  return(
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props}/>}
      screenOptions={{ swipeEnabled: false }}
    >
      <Tab.Screen name="Mieltymykset" component={UserPreferencesScreen}/>
      <Tab.Screen name="Omat tiedot" component={UserInfoScreen}/>
    </Tab.Navigator>
  )
}

export default UserTabs
