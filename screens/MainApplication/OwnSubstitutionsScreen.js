import { Pressable, Text, View, ScrollView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Styles from '../../assets/styles/styles'
import { colors } from '../../assets/styles/colors'

import UpcomingGigs from '../../components/UpcomingGigs'
import { getUserData } from '../../utils'
import NavigateToSavedSubstitutionsButton from '../../components/NavigateToSavedSubstitutionsButton'
import Payslip from '../../components/Payslip'
import {getCalendar} from '../../utils/getCalendar.js'
import { LocaleContext } from '../../contexts/LocaleContext'

const OwnSubstitutionsScreen = ({ navigation }) => {
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  const [isMonth, setIsMonth] = React.useState(true)
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
    <ScrollView contentContainerStyle={{paddingBottom: 300}}>
      <NavigateToSavedSubstitutionsButton navigation={navigation}/>

      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Pressable onPress={() => setIsMonth(true)}><Text>{i18n.t('month')}</Text></Pressable>
        <Pressable onPress={() => setIsMonth(false)}><Text>{i18n.t('week')}</Text></Pressable>
      </View>

      {getCalendar(isMonth)}

      <View style={{ paddingHorizontal: '5%' }}>
        <View>
          <Text style={[Styles.h2, {textAlign: 'left'}]}>{i18n.t('nextShift')}</Text>
          {userSubstitutions && <UpcomingGigs substIDs={userSubstitutions} navigation={navigation} />}
        </View>

        <Text style={[Styles.h2, {textAlign: 'left'}]}>Palkkakuitti</Text>
        <Payslip navigation={navigation}/>
      </View>
    </ScrollView>
  )
}

export default OwnSubstitutionsScreen