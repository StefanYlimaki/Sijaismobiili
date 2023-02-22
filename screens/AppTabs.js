
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabBar from './TabBar'
import UserTabs from './UserTabs'
import SavedSubstitutionsStack from './SavedSubstitutionsStack'
import TailoredSubstitutionsStack from './TailoredSubstitutionsStack'
import AllSubstitutionsStack from './AllSubstitutionsStack'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'

const Tab = createMaterialTopTabNavigator()

const AppTabs = () => {
  const [tabBarHidden, setTabBarHidden] = useState(false)
  const [swipeEnabled, setSwipeEnabled] = useState(true)

  return(
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} tabBarHidden={tabBarHidden}/>}
      initialRouteName={'Sinulle'}
      screenOptions={{
        swipeEnabled: swipeEnabled,
        tabBarContentContainerStyle: {
          maxWidth: '80%',
          justifyContent: 'space-around'
        },
        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen name="Tykätyt" children={props => <SavedSubstitutionsStack tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />} />
      <Tab.Screen name="Sinulle" children={props => <TailoredSubstitutionsStack tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />}/>
      <Tab.Screen name="Haku" children={props => <AllSubstitutionsStack tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />}/>
    </Tab.Navigator>
  )
}

export default AppTabs

//children={props => <SavedSubstitutionsStack tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} setSwipeEnabled={setSwipeEnabled} {...props} />}/>
//children={props => <SavedSubstitutionsStack tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} setSwipeEnabled={setSwipeEnabled} {...props} />}/>