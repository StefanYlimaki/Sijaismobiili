import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import SavedSubstitutionsStackScreen from './screens/SavedSubstitutionsStackScreen'
import AllSubstitutionsStackScreen from './screens/AllSubstitutionsStackScreen'
import TailoredSubstitutionsStackScreen from './screens/TailoredSubstitutionsStackScreen'

const Tab = createMaterialTopTabNavigator()
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <NavigationContainer>
        <Tab.Navigator >
          <Tab.Screen name="Tykätyt" component={SavedSubstitutionsStack} />
          <Tab.Screen name="Sinulle" component={TailoredSubstitutionsStack} />
          <Tab.Screen name="Kaikki" component={AllSubstitutionsStackn} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
};

//väliaikaisesti varmaan nyt näin, keksitään jokin
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});