import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native'

import SavedSubstitutionsStack from './screens/SavedSubstitutionsStack'
import AllSubstitutionsStack from './screens/AllSubstitutionsStack'
import TailoredSubstitutionsStack from './screens/TailoredSubstitutionsStack'

const Tab = createMaterialTopTabNavigator()
export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar/>
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
        </SafeAreaView>
    )
};

//väliaikaisesti varmaan nyt näin, keksitään jokin
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
