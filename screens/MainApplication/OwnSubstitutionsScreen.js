import { Pressable, Text, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Styles from '../../assets/styles/styles'
import { colors } from '../../assets/styles/colors'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import UpcomingGigs from '../../components/UpcomingGigs'
import { getUserData } from '../../utils'

import { LocaleContext } from '../../contexts/LocaleContext'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getCalendar } from '../../utils/getCalendar.js'

const OwnSubstitutionsScreen = ({ navigation }) => {
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  const [isMonth, setIsMonth] = React.useState(true)
  const [item, setItem] = useState('')
  const [userSubstitutions, setUserSubstitutions] = useState()

  useEffect(() => {
    async function fetchUserSubstitutions() {
      const userData = await getUserData()

      if (!userData.substitutions) {
        userData.substitutions = []
      }

      setUserSubstitutions(userData.substitutions)
    }

    fetchUserSubstitutions()
  })

  return (
    <View style={{ justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: '5%' }}>
        <Pressable style={{ paddingRight: '5%' }} onPress={() => setIsMonth(true)}><Text>{i18n.t('month')}</Text></Pressable>
        <Pressable style={{ paddingLeft: '5%' }} onPress={() => setIsMonth(false)}><Text>{i18n.t('week')}</Text></Pressable>
      </View>

      {getCalendar(isMonth)}

      <View style={{ paddingHorizontal: '5%' }}>
        <View>
          <Text style={Styles.h2}>{i18n.t('nextShift')}</Text>
          <View style={{ alignItems: 'center', backgroundColor: colors.krGray, borderColor: colors.textDark, borderRadius: 9, width: '78%' }}>
          </View>
        </View>

        <Text style={Styles.h2}>Palkkakuitti</Text>
        <View style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: colors.krGray, borderColor: colors.textDark, borderRadius: 9, borderWidth: 1, padding: '5%', width: '100%' }}>
          <Text>Kuluneen kuun aikana olet ansainnut{'\n'}</Text>
          <Text style={{ fontFamily: 'Inter-DisplaySemiBold', fontSize: 20 }}>noin 0 €</Text>
          <Text>{'\n'}Tarkastele palkkakuittiasi</Text>
        </View>
      </View>


      {userSubstitutions && <UpcomingGigs substIDs={userSubstitutions} navigation={navigation} />}
    </View>
  )
}

export default OwnSubstitutionsScreen