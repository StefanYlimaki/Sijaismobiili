import { Pressable, Text, View, TouchableHighlight } from 'react-native'
import { Calendar, LocaleConfig, DateData, CalendarProvider, CalendarContext, WeekCalendar } from 'react-native-calendars'
import React, { useState, useEffect, useContext, Fragment, useCallback } from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import Styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'
import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import { LocaleContext } from '../../contexts/LocaleContext'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import {getCalendar} from '../../utils/getCalendar.js'

const OwnSubstitutionsScreen = ({ navigation }) => {
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  LocaleConfig.locales[locale] = i18n.t('calendar')
  LocaleConfig.defaultLocale = locale

  let today = new Date().toDateString()
  const [isMonth, setIsMonth] = React.useState(true)
  //const [calendarType, setCalendarType] = getCalendar(isMonth)
  const [item, setItem] = useState('')

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Pressable onPress={() => setIsMonth(true)}><Text>{i18n.t('month')}</Text></Pressable>
        <Pressable onPress={() => setIsMonth(false)}><Text>{i18n.t('week')}</Text></Pressable>
      </View>

      <View>
        {getCalendar(isMonth)}
      </View>

      <View style={{ justifyContent: 'space-between', paddingHorizontal: '5%' }}>
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
    </ScrollView>
  )
}

export default OwnSubstitutionsScreen