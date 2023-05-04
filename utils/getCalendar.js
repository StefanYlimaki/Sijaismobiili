import Styles from '../assets/styles/styles'
import { colors } from '../assets/styles/colors'
import { LocaleContext } from '../contexts/LocaleContext'

import { Pressable, Text, View } from 'react-native'
import { Calendar, LocaleConfig, CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import React, { useState, useEffect, useContext } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import substitutions from '../assets/data/substitutionsData_new.json'
import { getUserData } from './getUserData'
import { formatTime } from './formatTime'

function SubstItem({substitution}) {
  return (
    <View style={{backgroundColor: colors.krGreenLight, padding: 5, borderRadius: 10, borderWidth: 1, marginBottom: 7}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={Styles.blackText}>{formatTime(substitution.timing.startTime, substitution.timing.duration)}</Text>
        <Text style={Styles.blackText}>{substitution.department}</Text>
      </View>
      <Text style={Styles.blackText}>{substitution.title}</Text>
    </View>
  )
}

export function getCalendar(isMonth, navigation) {

  let today = new Date().toDateString()
  const { i18n, locale, setLocale } = useContext(LocaleContext)
  LocaleConfig.locales[locale] = i18n.t('calendar')
  LocaleConfig.defaultLocale = locale

  const [userSubs, setUserSubs] = useState([])
  const [selected, setSelected] = useState(today)
  const [datesAgenda, setDatesAgenda] = useState([])

  const selectedDay = parseInt(selected.slice(-2), 10)
  const selectedMonth = selected.slice(6, 7)
  const selectedMonthString = i18n.t(`monthNamesPartitive[${selectedMonth - 1}]`)

  function updateAgenda(selectedDate) {
    setSelected(selectedDate)
    const agenda = userSubs.filter(sub => new Date(sub.timing.startTime).toDateString() === new Date(selectedDate).toDateString())
    setDatesAgenda(agenda)
    console.log(agenda)
  }

  useEffect(() => {
    const retrieveData = async () => {
      const userData = await getUserData()

      let filteredSubs = []

      if(userData.substitutions) {
        filteredSubs = substitutions.filter(sub => userData.substitutions.includes(sub.id))
      }
      setUserSubs(filteredSubs)
    }
    retrieveData()
  }, [])

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
          onDayPress={day => updateAgenda(day.dateString)}
        />
        <View style={Styles.agenda}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
              {selectedDay}{i18n.t('dayMonthDivider')}{selectedMonthString}
              {selected == today ? <Text> ({i18n.t('calendar.today').toLowerCase()})</Text> : null}
              {'\n'}{'\n'}
            </Text>
            <Pressable style={{ backgroundColor: colors.krGray, borderRadius: 9, height: '42%', width: '55%' }}>
              <Text onPress={() => navigation.navigate('EditAvailabilityScreen')} style={{ textAlign: 'center' }}>{i18n.t('editAvailability')}</Text>
            </Pressable>
          </View>

          {datesAgenda.map((item, index) => (
            <View key={index}>
              <SubstItem substitution={item} />
            </View>
          ))}

          {datesAgenda.length === 0 && <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>}
        </View>
      </View>

    )
  }
  return (
    <ScrollView >
      <CalendarProvider 
        date={selected}
        onDateChanged={day => updateAgenda(day)}
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

        {datesAgenda.map((item, index) => (
          <View key={index}>
            <SubstItem substitution={item} />
          </View>
        ))}

        {datesAgenda.length === 0 && <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>}
      </View>
    </ScrollView>
  )
}
