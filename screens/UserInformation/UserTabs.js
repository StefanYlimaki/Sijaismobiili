import React, { useContext, useState } from 'react'
import TabBar from './UserTabBar'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import UserInfoScreen from './UserInformation/UserInfoScreen'
import UserPreferencesScreen from './UserPreferences/UserPreferencesScreen'
import SettingsScreen from './UserSettings/SettingsScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LocaleContext } from '../../contexts/LocaleContext'
import PopupDialog from '../../components/PopupDialog'
import { View, Text, Pressable } from 'react-native'
import styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'

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

function UserInfoStackScreen(userTabBarHidden, setUserTabBarHidden) {
  const { i18n } = useContext(LocaleContext)
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen name='UserInfo' options={{headerShown: false}}>
        {props => {
          return(<UserInfoScreen userTabBarHidden={userTabBarHidden} setUserTabBarHidden={setUserTabBarHidden} {...props} />)
        }}
      </UserInfoStack.Screen>
      
      <UserInfoStack.Screen name='Settings' options={{headerTitle: i18n.t('settings'), headerBackTitleVisible: false}}>
        {props => {
          return(<SettingsScreen userTabBarHidden={userTabBarHidden} setUserTabBarHidden={setUserTabBarHidden} {...props} />)
        }}
      </UserInfoStack.Screen>
      <UserInfoStack.Screen name='RemoveAccountPopup' component={RemoveAccountPopup} options={{ presentation: 'transparentModal', headerShown: false }}/>
    </UserInfoStack.Navigator>
  )
}

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
      <Tab.Screen name="Omat tiedot" children={props => <UserInfoStackScreen userTabBarHidden={userTabBarHidden} setUserTabBarHidden={setUserTabBarHidden} {...props} />}/>
    </Tab.Navigator>
  )
}

export default UserInfoTab