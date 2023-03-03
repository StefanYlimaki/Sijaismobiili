import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllSubstitutionsScreen from './AllSubstitutionsScreen'
import SingleSubstitutionScreen from '../SingleSubstitutionScreen'
import SubstitutionCard from '../../../components/SubstitutionCard'

const AllStack = createNativeStackNavigator()

function AllSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled })  {
  return(
    <AllStack.Navigator screenOptions={{ headerShown: false}}>
      <AllStack.Screen name="all">
        {props => {
          return(<AllSubstitutionsScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </AllStack.Screen>
      <AllStack.Screen name="Substitution">
        {props => {
          return(<SingleSubstitutionScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </AllStack.Screen>
      <AllStack.Screen name='SubstitutionCard' component={SubstitutionCard} options={{ presentation: 'transparentModal', headerShown: false }}/>
    </AllStack.Navigator>
  )
}
export default AllSubstitutionsStackScreen