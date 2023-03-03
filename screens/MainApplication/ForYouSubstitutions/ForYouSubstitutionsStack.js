import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ForYouSubstitutionsScreen from './ForYouSubstitutionsScreen'
import SingleSubstitutionScreen from '../SingleSubstitutionScreen'
import SubstitutionCard from '../../../components/SubstitutionCard'

const TailoredStack = createNativeStackNavigator()

function TailoredSubstitutionsStackScreen({ navigation, route, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled })  {
  return(
    <TailoredStack.Navigator screenOptions={{ headerShown: false}}>
      <TailoredStack.Screen name="tailored">
        {props => {
          return(<ForYouSubstitutionsScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </TailoredStack.Screen>
      <TailoredStack.Screen name="Substitution">
        {props => {
          return(<SingleSubstitutionScreen tabBarHidden={tabBarHidden} setTabBarHidden={setTabBarHidden} swipeEnabled={swipeEnabled} setSwipeEnabled={setSwipeEnabled} {...props} />)
        }}
      </TailoredStack.Screen>
      <TailoredStack.Screen name='SubstitutionCard' component={SubstitutionCard} options={{ presentation: 'transparentModal', headerShown: false }}/>
    </TailoredStack.Navigator>
  )
}

export default TailoredSubstitutionsStackScreen