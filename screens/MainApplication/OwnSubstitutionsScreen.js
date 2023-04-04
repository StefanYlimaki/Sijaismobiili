import { Text, View } from 'react-native'
import { Calendar, LocaleConfig, DateData, CalendarProvider, CalendarContext } from 'react-native-calendars'
import React, { useState, useEffect, useContext, Fragment } from 'react'

import Styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'
import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import { LocaleContext } from '../../contexts/LocaleContext'

const OwnSubstitutionsScreen = ({ navigation }) => {
  const { i18n, locale, setLocale } = useContext(LocaleContext)

  LocaleConfig.locales[locale] = i18n.t('calendar')
  LocaleConfig.defaultLocale = locale

  let today = new Date().toDateString()
  const [selected, setSelected] = useState(today)
  const [item, setItem] = useState('')
  const selectedDay = parseInt(selected.slice(-2), 10)
  const selectedMonth = selected.slice(6, 7)
  const selectedMonthString = i18n.t(`monthNamesPartitive[${selectedMonth - 1}]`)

  return (
    <View style={{ justifyContent: 'space-between', paddingHorizontal: '5%' }}>
      <Calendar
        style={Styles.calendar}
        headerStyle={{ paddingTop: 5 }}
        firstDay={1}
        current={selected}
        markingType={'custom'}
        hideExtraDays={true}

        onDayPress={day => setSelected(day.dateString)}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: Colors.krGreen,
          dayTextColor: '#2d4150',
          textDisabledColor: '',
        }}
      />
      <View>
        <View style={Styles.agenda}>
          <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {selectedDay}{i18n.t('dayMonthDivider')}{selectedMonthString}
            {selected == today ? <Text> ({i18n.t('calendar.today').toLowerCase()})</Text> : null}
            {'\n'}{'\n'}
          </Text>
          <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>
        </View>
      </View>

      <View>
        <Text style={Styles.h2}>Seuraava vuoro</Text>
        <View style={{ alignItems: 'center', backgroundColor: Colors.krGray, borderColor: Colors.textDark, borderRadius: 9, width: '78%' }}>
        </View>
      </View>

      <Text style={Styles.h2}>Palkkakuitti</Text>
      <View style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: Colors.krGray, borderColor: Colors.textDark, borderRadius: 9, width: '100%' }}>
        <Text>Kuluneen kuun aikana olet ansainnut</Text>
        <Text style={{ fontFamily: 'Inter-DisplaySemiBold', fontSize: 20 }}>noin 0 €</Text>
        <Text>Tarkastele palkkakuittiasi</Text>
      </View>
    </View>
  )
}

export default OwnSubstitutionsScreen