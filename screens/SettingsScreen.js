import React, { useState } from 'react'
import { StyleSheet, View, Text, Switch, Button, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import * as Colors from '../assets/styles/colors'

const SettingsScreen = () => {
  const [useSystemLanguage, setUseSystemLanguage] = useState(true)
  const [useNotifications, setUseNotifications] = useState(true)
  const [appLanguage, setAppLanguage] = useState('Finnish')

  return (
    <View style={stylesTest.settingsScreen}>
      {/* Settings */ }
      <View style={stylesTest.settingsContainer}>

        {/* Language */ }
        <View style={stylesTest.singleSettingContainer}>
          <Text style={styles.h2}>Kieli</Text>
          <Text style={stylesTest.settingsSubHeader}>Automaattinen</Text>
          <View style={stylesTest.switchContainer}>
            <Switch
              style={{marginRight:10}}
              value={useSystemLanguage}
              onValueChange={() => {setUseSystemLanguage(!useSystemLanguage)}}
            />
            <Text style={styles.blackText}>{useSystemLanguage ? 'Kyllä' : 'Ei käytössä'}</Text>
          </View>

          <View style={stylesTest.languageButtonsContainer}>

            <Pressable
              style={!useSystemLanguage && appLanguage==='Finnish' ? stylesTest.languageButton : stylesTest.languageButtonDisabled}
              disabled={useSystemLanguage}
              onPress={() => {setAppLanguage('Finnish')}}
            >
              <Text style={stylesTest.buttonText}>Finnish</Text>
            </Pressable>
            <Pressable
              style={!useSystemLanguage && appLanguage==='Swedish' ? stylesTest.languageButton : stylesTest.languageButtonDisabled}
              disabled={useSystemLanguage}
              onPress={() => {setAppLanguage('Swedish')}}
            >
              <Text style={stylesTest.buttonText}>Swedish</Text>
            </Pressable>
            <Pressable
              style={!useSystemLanguage && appLanguage==='English' ? stylesTest.languageButton : stylesTest.languageButtonDisabled}
              disabled={useSystemLanguage}
              onPress={() => {setAppLanguage('English')}}
            >
              <Text style={stylesTest.buttonText}>English</Text>
            </Pressable>
          </View>

        </View>

        {/* Notifications */ }
        <View style={stylesTest.singleSettingContainer}>
          <Text style={styles.h2}>Ilmoitukset</Text>
          <View style={stylesTest.switchContainer}>
            <Switch
              style={{marginRight:10}}
              value={useNotifications}
              onValueChange={() => {setUseNotifications(!useNotifications)}}
            />
            <Text style={styles.blackText}>{useNotifications ? 'Kyllä' : 'Ei käytössä'}</Text>
          </View>
        </View>

        {/* Info */ }
        <View style={stylesTest.singleSettingContainer}>
          <Text style={styles.h2}>Tietoja</Text>
          <Text style={stylesTest.linkText}>Lisenssit</Text>
          <Text style={stylesTest.linkText}>Tuki</Text>
        </View>
      </View>

      {/* Footer */ }
      <View style={stylesTest.settingsFooter}>
        <Pressable style={stylesTest.logOutButton}>
          <Text style={stylesTest.buttonText}>Kirjaudu ulos</Text>
        </Pressable>
        <View style={stylesTest.footerSettings}>
          <Pressable>
            <Text style={stylesTest.footerButtonText}>Nollaa suositukset ja asetukset</Text>
          </Pressable>
          <Pressable>
            <Text style={stylesTest.footerButtonText}>Poista tili</Text>
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
  settingsSubHeader: {
    fontFamily: 'Inter-DisplaySemiBold',
    paddingBottom: 10,
    paddingTop:5
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