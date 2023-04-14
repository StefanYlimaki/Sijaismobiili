import { Pressable, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import Styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'

import { LocaleContext } from '../../contexts/LocaleContext'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { getCalendar } from '../../utils/getCalendar.js'

const OwnSubstitutionsScreen = ({ navigation }) => {
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  const [isMonth, setIsMonth] = React.useState(true)
  const [item, setItem] = useState('')

  return (
    <View style={{ justifyContent: 'space-between' }}>
      <View style={{ flexDirection: "row", justifyContent: 'flex-start', paddingHorizontal: '5%' }}>
        <Pressable style={{ paddingRight: '5%' }} onPress={() => setIsMonth(true)}><Text>{i18n.t('month')}</Text></Pressable>
        <Pressable style={{ paddingLeft: '5%' }} onPress={() => setIsMonth(false)}><Text>{i18n.t('week')}</Text></Pressable>
      </View>

      {getCalendar(isMonth)}

      <View style={{ paddingHorizontal: '5%' }}>
        <View>
          <Text style={Styles.h2}>{i18n.t('nextShift')}</Text>
          <View style={{ alignItems: 'center', backgroundColor: Colors.krGray, borderColor: Colors.textDark, borderRadius: 9, width: '78%' }}>
          </View>
        </View>

        <Text style={Styles.h2}>Palkkakuitti</Text>
        <View style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: Colors.krGray, borderColor: Colors.textDark, borderRadius: 9, borderWidth: 1, padding: '5%', width: '100%' }}>
          <Text>Kuluneen kuun aikana olet ansainnut{'\n'}</Text>
          <Text style={{ fontFamily: 'Inter-DisplaySemiBold', fontSize: 20 }}>noin 0 €</Text>
          <Text>{'\n'}Tarkastele palkkakuittiasi</Text>
        </View>
      </View>
    </View>
  )
}

export default OwnSubstitutionsScreen