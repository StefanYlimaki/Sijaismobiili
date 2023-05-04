import Styles from '../assets/styles/styles'
import { colors } from '../assets/styles/colors'
import { LocaleContext } from '../contexts/LocaleContext'

import { Pressable, Text, View, TouchableHighlight } from 'react-native'
import { Calendar, LocaleConfig, DateData, CalendarProvider, CalendarContext, WeekCalendar, ExpandableCalendar } from 'react-native-calendars'
import React, { useState, useEffect, useContext, Fragment, useCallback } from 'react'

import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'

export function getCalendar(isMonth) {

  let today = new Date().toDateString()
  const { i18n, locale, setLocale } = useContext(LocaleContext)
  LocaleConfig.locales[locale] = i18n.t('calendar')
  LocaleConfig.defaultLocale = locale

  const [item, setItem] = useState('')
  const [selected, setSelected] = useState(today)

  const selectedDay = parseInt(selected.slice(-2), 10)
  const selectedMonth = selected.slice(6, 7)
  const selectedMonthString = i18n.t(`monthNamesPartitive[${selectedMonth - 1}]`)

  if (isMonth) {
    return (
      <View style={{ justifyContent: 'space-between', paddingHorizontal: '5%', }}>
        <Calendar
          style={Styles.calendar}
          headerStyle={{ paddingTop: 5 }}
          current={selected}
          firstDay={1}
          hideExtraDays={true}
          markedDates={{[selected]: {selected: true}}}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: colors.krGreen,
            textDisabledColor: '',
          }}
          onDayPress={day => setSelected(day.dateString)}
        />
        <View style={Styles.agenda}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
              {selectedDay}{i18n.t('dayMonthDivider')}{selectedMonthString}
              {selected == today ? <Text> ({i18n.t('calendar.today').toLowerCase()})</Text> : null}
              {'\n'}{'\n'}
            </Text>
            <Pressable style={{ backgroundColor: colors.krGray, borderRadius: 9, height: '42%', width: '55%' }}>
              <Text style={{ textAlign: 'center' }}>{i18n.t('editAvailability')}</Text>
            </Pressable>
          </View>
          <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>
        </View>
      </View>

    )
  }
  return (
    <ScrollView >
      <CalendarProvider 
        date={selected}
        onDateChanged={day => setSelected(day)}
      >
        <View>
          <ExpandableCalendar
            hideKnob = {true}
            disablePan = {true}
            initialPosition='closed'
            allowShadow = {false}
            firstDay={1}
          />
        </View>
      </CalendarProvider>

      <View style={Styles.agenda}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {selectedDay}{i18n.t('dayMonthDivider')}{selectedMonthString}
            {selected == today ? <Text> ({i18n.t('calendar.today').toLowerCase()})</Text> : null}
            {'\n'}{'\n'}
          </Text>
          <Pressable style={{ backgroundColor: colors.krGray, borderRadius: 9, height: '38%', width: '55%' }}>
            <Text style={{ textAlign: 'center' }}>{i18n.t('editAvailability')}</Text>
          </Pressable>
        </View>
        <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>
      </View>
    </ScrollView>
  )
}