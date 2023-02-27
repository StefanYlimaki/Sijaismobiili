import React, { useContext } from 'react'
import TabBar from './UserTabBar'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import UserInfoScreen from './UserInfoScreen'
import UserPreferencesScreen from './UserPreferencesScreen'
import SettingsScreen from './SettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LocaleContext } from '../contexts/LocaleContext'
import PopupDialog from '../components/PopupDialog'
import { View, Text, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import * as Colors from '../assets/styles/colors.js'

const Tab = createMaterialTopTabNavigator()

const UserInfoStack = createNativeStackNavigator()

function RemoveAccountPopup({navigation}) {
  const { i18n } = useContext(LocaleContext)

  return (
    <PopupDialog headerText={i18n.t('deleteConfirmation')} headerColor={Colors.danger} navigation={navigation}>
      <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 25}}>
        <Pressable style={styles.removeAccountButton}>
          <Text style={styles.removeAccountButtonText}>{i18n.t('removeAccount')}</Text>
        </Pressable>
      </View>
    </PopupDialog>
  )
}

function UserInfoStackScreen() {
  const { i18n } = useContext(LocaleContext)
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen name='UserInfo' component={UserInfoScreen} options={{headerShown: false}}/>
      <UserInfoStack.Screen name='Settings' component={SettingsScreen} options={{headerTitle: i18n.t('settings'), headerBackTitleVisible: false}}/>
      <UserInfoStack.Screen name='RemoveAccountPopup' component={RemoveAccountPopup} options={{ presentation: 'transparentModal', headerShown: false }}/>
    </UserInfoStack.Navigator>
  )
}

function UserInfoTab({ navigation, route })  {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === 'Substitution'){
      navigation.setOptions({tabBarStyle: {display: 'none'}})
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}})
    }
  }, [navigation, route])

  return(
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props}/>}
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
      <Tab.Screen name="Omat tiedot" component={UserInfoStackScreen}/>
    </Tab.Navigator>
  )
}

export default UserInfoTab