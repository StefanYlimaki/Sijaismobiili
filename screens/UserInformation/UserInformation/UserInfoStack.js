import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, Pressable } from 'react-native'
import { LocaleContext } from '../../../contexts/LocaleContext'

import UserInfoScreen from './UserInfoScreen'
import SettingsScreen from '../UserSettings/SettingsScreen'
import PopupDialog from '../../../components/PopupDialog'
import styles from '../../../assets/styles/styles'
import * as Colors from '../../../assets/styles/colors.js'

const stack = createNativeStackNavigator()

function UserInfoStack(userTabBarHidden, setUserTabBarHidden) {
  const { i18n } = useContext(LocaleContext)
  return (
    <stack.Navigator>
      <stack.Screen name='UserInfo' options={{headerShown: false}}>
        {props => {
          return(<UserInfoScreen userTabBarHidden={userTabBarHidden} setUserTabBarHidden={setUserTabBarHidden} {...props} />)
        }}
      </stack.Screen>
        
      <stack.Screen name='Settings' options={{headerTitle: i18n.t('settings'), headerBackTitleVisible: false}}>
        {props => {
          return(<SettingsScreen userTabBarHidden={userTabBarHidden} setUserTabBarHidden={setUserTabBarHidden} {...props} />)
        }}
      </stack.Screen>
      <stack.Screen name='RemoveAccountPopup' component={RemoveAccountPopup} options={{ presentation: 'transparentModal', headerShown: false }}/>
    </stack.Navigator>
  )
}

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

export default UserInfoStack