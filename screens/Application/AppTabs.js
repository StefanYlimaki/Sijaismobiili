
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TabBar from './TabBar'
import UserTabs from '../User/UserTabs'
import SavedSubstitutionsStack from '../SavedSubstitutionsStack'
import TailoredSubstitutionsStack from '../TailoredSubstitutionsStack'
import AllSubstitutionsStack from '../AllSubstitutionsStack'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'

const Tab = createMaterialTopTabNavigator()

const AppTabs = () => {
  const [tabBarHidden, setTabBarHidden] = useState(false)
  const route = useRoute()
  console.log(route)

  return(
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} tabBarHidden={tabBarHidden}/>}
      initialRouteName={'Sinulle'}
      screenOptions={{
        swipeEnabled: true,
        tabBarContentContainerStyle: {
          maxWidth: '80%',
          justifyContent: 'space-around'
        },
        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}
    >
      <Tab.Screen name="Tykätyt" children={props => <SavedSubstitutionsStack tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} {...props} />} />
      <Tab.Screen name="Sinulle" component={TailoredSubstitutionsStack}/>
      <Tab.Screen name="Haku" component={AllSubstitutionsStack}/>
    </Tab.Navigator>
  )
}

export default AppTabs
