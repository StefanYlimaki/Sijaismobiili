import { ActivityIndicator, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'

import { LocaleContext } from '../../contexts/LocaleContext'
import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { krBlue, textLight } from '../../assets/styles/colors'
import styles from '../../assets/styles/styles'
import { color } from 'react-native-reanimated'

let updatedAt = 0

const TailoredSubstitutions = ({ route, navigation }) => {

  const [loading, setLoading] = useState(true)
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])
  const { i18n, locale, setLocale } = useContext(LocaleContext)


  async function callOrderAndFilterSubstitutionsByPreferences() {
    const UserUpdatedAt = await AsyncStorage.getItem('updatedAt')
    if (UserUpdatedAt > updatedAt) {
      const result = await orderAndFilterSubstitutionsByPreferences(substitutions)
      console.log(result.length)
      setTailoredSubstitutions(result)
      updatedAt = UserUpdatedAt
    }
    setLoading(false)
  }

  useEffect(() => {
    setInterval(async () => {
      await callOrderAndFilterSubstitutionsByPreferences()
    }, 1000)
  }, [])

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator size="large" color={krBlue} />
      </View>
    )
  }

  if (tailoredSubstitutions.length === 0) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', }}>
        <View style={{ width: '78%', paddingVertical: '9%' }}>
          <Text style={{ fontFamily: 'Inter-DisplaySemiBold', textAlign: 'center', }}>{i18n.t('noShifts')}</Text>
        </View>
        <Pressable style={styles.bigButton} onPress={() => { navigation.navigate('UserPreferencesScreen') }}>
          <Text style={{ color: textLight }}>{i18n.t('editPreferences')}</Text>
        </Pressable>
        <Pressable style={styles.bigButton} onPress={() => { navigation.navigate('AllSubstitutionsScreen') }}>
          <Text style={{ color: textLight }}>{i18n.t('seeAllShifts')}</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View>
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions} />
    </View>
  )
}

export default TailoredSubstitutions