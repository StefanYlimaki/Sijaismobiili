

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserInfoScreen from './UserInfoScreen'
import SettingsScreen from './SettingsScreen'
import UserTabs from './UserTabs'


const UserInfoStack = createNativeStackNavigator()

export function UserInformationStack() {
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen name='User' component={UserTabs} options={{ headerShown: false }}/>
      <UserInfoStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: true, title: 'Asetukset' }} />
      <UserInfoStack.Screen name='RemoveAccountPopup' component={RemoveAccountPopup} options={{ presentation: 'transparentModal', headerShown: false }}/>
    </UserInfoStack.Navigator>
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