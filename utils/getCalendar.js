import Styles from '../assets/styles/styles'
import * as Colors from '../assets/styles/colors.js'
import { LocaleContext } from '../contexts/LocaleContext'

import { Pressable, Text, View, TouchableHighlight } from 'react-native'
import { Calendar, LocaleConfig, DateData, CalendarProvider, CalendarContext, WeekCalendar } from 'react-native-calendars'
import React, { useState, useEffect, useContext, Fragment, useCallback } from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'

export function getCalendar(isMonth) {

    let today = new Date().toDateString()
    const { i18n, locale, setLocale } = useContext(LocaleContext)
    LocaleConfig.defaultLocale = locale

    const [item, setItem] = useState('')
    const [selected, setSelected] = useState(today)

    const selectedDay = parseInt(selected.slice(-2), 10)
    const selectedMonth = selected.slice(6, 7)
    const selectedMonthString = i18n.t(`monthNamesPartitive[${selectedMonth - 1}]`)

    if (isMonth) {
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
                        textDisabledColor: '',
                    }}
                />
                <View style={Styles.agenda}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                            {selectedDay}{i18n.t('dayMonthDivider')}{selectedMonthString}
                            {selected == today ? <Text> ({i18n.t('calendar.today').toLowerCase()})</Text> : null}
                            {'\n'}{'\n'}
                        </Text>
                        <Pressable style={{ backgroundColor: Colors.krGray, borderRadius: 9, height: '38%', width: '55%' }}>
                            <Text style={{ textAlign: 'center' }}>{i18n.t('editAvailability')}</Text>
                        </Pressable>
                    </View>
                    <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>
                </View>
            </View>

        );
    }
    return (
        <View style={{ justifyContent: 'space-between', paddingHorizontal: '5%' }}>
            <WeekCalendar
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
                    textDisabledColor: '',
                }}
            />
            <View style={Styles.agenda}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                        {selectedDay}{i18n.t('dayMonthDivider')}{selectedMonthString}
                        {selected == today ? <Text> ({i18n.t('calendar.today').toLowerCase()})</Text> : null}
                        {'\n'}{'\n'}
                    </Text>
                    <Pressable style={{ backgroundColor: Colors.krGray, borderRadius: 9, height: '38%', width: '55%' }}>
                        <Text style={{ textAlign: 'center' }}>{i18n.t('editAvailability')}</Text>
                    </Pressable>
                </View>
                <Text style={{ textAlign: 'center' }}>{i18n.t('agendaDefault')}{'\n'}{'\n'}</Text>
            </View>
        </View>
    );
}