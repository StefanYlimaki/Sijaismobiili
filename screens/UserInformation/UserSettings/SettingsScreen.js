import React, { useContext, useState } from 'react'
import { View, Text, Switch, Pressable } from 'react-native'
import styles from '../../../assets/styles/styles'
import { LocaleContext } from '../../../contexts/LocaleContext'

function SettingsScreen({navigation, userTabBarHidden }) {
  const [useNotifications, setUseNotifications] = useState(true)
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  if(!userTabBarHidden.userTabBarHidden && navigation.isFocused()){
    userTabBarHidden.setUserTabBarHidden(true)
  }
  
  return (
    <View style={styles.settingsScreen}>
      {/* Settings */ }
      <View style={styles.settingsContainer}>

        {/* Language */ }
        <View style={styles.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsLanguage')}</Text>

          <View style={styles.languageButtonsContainer}>

            <Pressable
              style={locale==='fi' ? styles.languageButton : styles.languageButtonDisabled}
              onPress={() => {setLocale('fi')}}
            >
              <Text style={styles.buttonText}>Finnish</Text>
            </Pressable>
            <Pressable
              style={locale==='se' ? styles.languageButton : styles.languageButtonDisabled}
              onPress={() => {setLocale('se')}}
            >
              <Text style={styles.buttonText}>Swedish</Text>
            </Pressable>
            <Pressable
              style={locale==='en' ? styles.languageButton : styles.languageButtonDisabled}
              onPress={() => {setLocale('en')}}
            >
              <Text style={styles.buttonText}>English</Text>
            </Pressable>
          </View>

        </View>

        {/* Notifications */ }
        <View style={styles.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsNotifications')}</Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginRight:10}}
              value={useNotifications}
              onValueChange={() => {setUseNotifications(!useNotifications)}}
            />
            <Text style={styles.blackText}>{useNotifications ? i18n.t('yes') : i18n.t('settingsDisabled')}</Text>
          </View>
        </View>

        {/* Info */ }
        <View style={styles.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsInfo')}</Text>
          <Text style={styles.linkText}>{i18n.t('settingsLicenses')}</Text>
          <Text style={styles.linkText}>{i18n.t('settingsSupport')}</Text>
        </View>
      </View>

      {/* Footer */ }
      <View style={styles.settingsFooter}>
        <Pressable style={styles.logOutButton}>
          <Text style={styles.buttonText}>{i18n.t('settingsLogOut')}</Text>
        </Pressable>
        <View style={styles.footerSettings}>
          <Pressable>
            <Text style={styles.footerButtonText}>{i18n.t('settingsRestoreSettings')}</Text>
          </Pressable>
          <Pressable onPress={() => {navigation.navigate('RemoveAccountPopup')}}>
            <Text style={styles.footerButtonText}>{i18n.t('settingsRemoveAccount')}</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
}

export default SettingsScreen