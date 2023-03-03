import React, { useState } from 'react'
import TabBar from './UserTabBar'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import UserInfoStack from './UserInformation/UserInfoStack'
import UserPreferencesScreen from './UserPreferences/UserPreferencesScreen'

const Tab = createMaterialTopTabNavigator()

function UserInfoTab({ navigation, route })  {
  const [userTabBarHidden, setUserTabBarHidden] = useState(false)
  
  return(
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} userTabBarHidden={userTabBarHidden}/>}
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
      <Tab.Screen name="Omat tiedot" children={props => <UserInfoStack userTabBarHidden={userTabBarHidden} setUserTabBarHidden={setUserTabBarHidden} {...props} />}/>
    </Tab.Navigator>
  )
}

export default UserInfoTab