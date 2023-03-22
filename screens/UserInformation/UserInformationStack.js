import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserInfoScreen from './UserInfoScreen'
import SettingsScreen from './SettingsScreen'
import UserTabs from './UserTabs'
import {useContext} from 'react'
import {LocaleContext} from '../../App'
import {Alert} from 'react-native'


const UserInfoStack = createNativeStackNavigator()

export function UserInformationStack() {
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen name='User' component={UserTabs} options={{ headerShown: false }}/>
      <UserInfoStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: true, title: 'Asetukset' }} />
    </UserInfoStack.Navigator>
  )
}

