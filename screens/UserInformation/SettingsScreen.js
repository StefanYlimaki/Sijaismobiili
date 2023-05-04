import React, { useContext, useState } from 'react'
import { View, Text, Switch, Pressable, Alert } from 'react-native'
import styles from '../../assets/styles/styles'
import { LocaleContext } from '../../contexts/LocaleContext'

function SettingsScreen({ navigation }) {
  const [useNotifications, setUseNotifications] = useState(true)
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  const removeAccount = () => {
    Alert.alert(
      i18n.t('removeAccount'),
      i18n.t('deleteConfirmation'),
      [
        {
          text: i18n.t('settingsRemoveAccount'),
          onPress: () => { confirmation() },
          style: 'destructive',
        },
        {
          text: i18n.t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    )
  }
  const confirmation = () => {
    Alert.alert(
      i18n.t('removeAccountConfirmation'),
      i18n.t('deleteConfirmation2'),
      [
        {
          text: i18n.t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: i18n.t('settingsRemoveAccount'),
          onPress: () => console.log('Remove Pressed'),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.settingsScreen}>
      {/* Settings */}
      <View style={styles.settingsContainer}>

        {/* Language */}
        <View style={styles.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsLanguage')}</Text>
          <View style={styles.languageButtonsContainer}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Suomi"
              accessibilityHint='Vaihtaa sovelluksen kielen suomeksi'
              style={locale === 'fi-FI' ? styles.languageButton : styles.languageButtonDisabled}
              onPress={() => { setLocale('fi-FI') }}
            >
              <Text style={styles.buttonText}>Finnish</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ruotsi"
              accessibilityHint='Vaihtaa sovelluksen kielen ruotsiksi'
              style={locale === 'se' ? styles.languageButton : styles.languageButtonDisabled}
              onPress={() => { setLocale('se') }}
            >
              <Text style={styles.buttonText}>Swedish</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Englanti"
              accessibilityHint='Vaihtaa sovelluksen kielen englanniksi'
              style={locale === 'en' ? styles.languageButton : styles.languageButtonDisabled}
              onPress={() => { setLocale('en') }}
            >
              <Text style={styles.buttonText}>English</Text>
            </Pressable>
          </View>

        </View>

        {/* Notifications */}
        <View style={styles.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsNotifications')}</Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{ marginRight: 10 }}
              value={useNotifications}
              onValueChange={() => { setUseNotifications(!useNotifications) }}
            />
            <Text style={styles.blackText}>{useNotifications ? i18n.t('yes') : i18n.t('settingsDisabled')}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.singleSettingContainer}>
          <Text style={styles.h2}>{i18n.t('settingsInfo')}</Text>
          <Text style={styles.linkText}>{i18n.t('settingsLicenses')}</Text>
          <Text style={styles.linkText}>{i18n.t('settingsSupport')}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.settingsFooter}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={i18n.t('settingsLogOut')}
          accessibilityHint='Kirjautuu ulos sovelluksesta'
          style={styles.logOutButton}>
          <Text style={styles.buttonText}>{i18n.t('settingsLogOut')}</Text>
        </Pressable>
        <View style={styles.footerSettings}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={i18n.t('settingsRestoreSettings')}>
            <Text style={styles.footerButtonText}>{i18n.t('settingsRestoreSettings')}</Text>
          </Pressable>
          <Pressable 
            accessibilityRole="button"
            accessibilityLabel={i18n.t('settingsRemoveAccount')}
            accessibilityHint='Avaa varmistuskortin'
            onPress={() => { removeAccount() }}>
            <Text style={styles.footerButtonText}>{i18n.t('settingsRemoveAccount')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
export default SettingsScreen