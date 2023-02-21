import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, Switch, Button, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import * as Colors from '../assets/styles/colors'
import {LocaleContext} from '../App'

const SettingsScreen = () => {
  const [useNotifications, setUseNotifications] = useState(true)
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  return (
    <View style={stylesTest.settingsScreen}>
      {/* Settings */ }
      <View style={stylesTest.settingsContainer}>

        {/* Language */ }
        <View style={stylesTest.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsLanguage')}</Text>

          <View style={stylesTest.languageButtonsContainer}>

            <Pressable
              style={locale==='fi' ? stylesTest.languageButton : stylesTest.languageButtonDisabled}
              onPress={() => {setLocale('fi')}}
            >
              <Text style={stylesTest.buttonText}>Finnish</Text>
            </Pressable>
            <Pressable
              style={locale==='se' ? stylesTest.languageButton : stylesTest.languageButtonDisabled}
              onPress={() => {setLocale('se')}}
            >
              <Text style={stylesTest.buttonText}>Swedish</Text>
            </Pressable>
            <Pressable
              style={locale==='en' ? stylesTest.languageButton : stylesTest.languageButtonDisabled}
              onPress={() => {setLocale('en')}}
            >
              <Text style={stylesTest.buttonText}>English</Text>
            </Pressable>
          </View>

        </View>

        {/* Notifications */ }
        <View style={stylesTest.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsNotifications')}</Text>
          <View style={stylesTest.switchContainer}>
            <Switch
              style={{marginRight:10}}
              value={useNotifications}
              onValueChange={() => {setUseNotifications(!useNotifications)}}
            />
            <Text style={styles.blackText}>{useNotifications ? i18n.t('yes') : i18n.t('settingsDisabled')}</Text>
          </View>
        </View>

        {/* Info */ }
        <View style={stylesTest.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsInfo')}</Text>
          <Text style={stylesTest.linkText}>{i18n.t('settingsLicenses')}</Text>
          <Text style={stylesTest.linkText}>{i18n.t('settingsSupport')}</Text>
        </View>
      </View>

      {/* Footer */ }
      <View style={stylesTest.settingsFooter}>
        <Pressable style={stylesTest.logOutButton}>
          <Text style={stylesTest.buttonText}>{i18n.t('settingsLogOut')}</Text>
        </Pressable>
        <View style={stylesTest.footerSettings}>
          <Pressable>
            <Text style={stylesTest.footerButtonText}>{i18n.t('settingsRestoreSettings')}</Text>
          </Pressable>
          <Pressable>
            <Text style={stylesTest.footerButtonText}>{i18n.t('settingsRemoveAccount')}</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
}

const stylesTest = StyleSheet.create({
  buttonText: {
    color: Colors.textLight,
    fontFamily: 'Inter-DisplaySemiBold',

  },
  footerButtonText: {
    color: Colors.danger,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  footerSettings: {
    alignItems: 'center',
    marginTop: 30
  },
  languageButton: {
    backgroundColor: Colors.info,
    borderRadius: 7,
    marginBottom: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 5,
    width: 120
  },
  languageButtonDisabled: {
    backgroundColor: '#D9D9D9',
    borderRadius: 7,
    marginBottom: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 5,
    width: 120
  },
  languageButtonsContainer: {
    marginTop: 20
  },
  linkText: {
    marginBottom: 2,
    textDecorationLine: 'underline'
  },
  logOutButton: {
    backgroundColor: Colors.warning,
    borderRadius: '100%',
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5
  },
  settingsContainer: {
    flex: 4
  },
  settingsFooter : {
    alignItems: 'center',
    flex: 1,
  },
  settingsScreen: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  singleSettingContainer: {
    paddingTop: 20
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    rowGap: 50
  }
})

export default SettingsScreen