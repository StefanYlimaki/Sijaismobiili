import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {View} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStack from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'
import styles from './assets/styles/styles.js'

const Tab = createMaterialTopTabNavigator()
export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Tab.Navigator
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

                    <Tab.Screen name="Tykätyt" component={SavedSubstitutionsStack}/>
                    <Tab.Screen name="Tailored" component={TailoredSubstitutionsStack} options={{ title: 'Sinulle' }}/>
                    <Tab.Screen name="Kaikki" component={AllSubstitutionsStack}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
};
