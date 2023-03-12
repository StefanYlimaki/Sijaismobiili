import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AllSubstitutionsScreen from './AllSubstitutionsScreen'
import TailoredSubstitutionsScreen from './TailoredSubstitutionsScreen'
import SavedSubstitutionsScreen from './SavedSubstitutionsScreen'
import { View, TouchableOpacity, Animated } from 'react-native'
import TabBar from './TabBar'

const Tab = createMaterialTopTabNavigator()

const AppTabs = ({ navigation, route }) => {

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
  }, [navigation])

  return(
    <Tab.Navigator
      tabBar={props => <TabBar {...props}/>}
      initialRouteName={'Sinulle'}
    >
      <Tab.Screen name="Tykätyt" component={ SavedSubstitutionsScreen } />
      <Tab.Screen name="Sinulle" component={ TailoredSubstitutionsScreen }/>
      <Tab.Screen name="Haku" component={ AllSubstitutionsScreen }/>
    </Tab.Navigator>
  )
}

export default AppTabs
