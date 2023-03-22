//Seuraavaa vuoroa varten tarvitaan dataa niistä keikoista ja vuoroista, joihin käyttäjä on kiinnittäytynyt
//Palkkakuittia varten tarvitaan dataa menneistä VUOROISTA, joihin käyttäjä on kiinnittäytynyt.
//Täytyy voida hakea kuittiin vuorot vain kuluneen kuun osalta. Kuitti nollaantuu kuun 1. päivä.

import { Text, View, Button } from 'react-native'
import {Calendar, CalendarList, Agenda, LocaleConfig, DateData, AgendaEntry, AgendaSchedule, CalendarProvider, CalendarContext} from 'react-native-calendars'
import React, { useRef, useState } from 'react'

import Styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'
import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'

const OwnSubstitutionsScreen = ({ navigation }) => {

    LocaleConfig.locales['fi'] = {
        monthNames: [
          'Tammikuu',
          'Helmikuu',
          'Maaliskuu',
          'Huhtikuu',
          'Toukokuu',
          'Kesäkuu',
          'Heinäkuu',
          'Elokuu',
          'Syyskuu',
          'Lokakuu',
          'Marraskuu',
          'Joulukuu'
        ],
        monthNamesShort: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
        dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
        dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
        today: "Tänään"
      };
      LocaleConfig.defaultLocale = 'fi';

      const [selected, setSelected] = useState(selected);
      const [item, setItem] = useState('');
  return (
    <View style= {{justifyContent: 'space-between'}}>

    
    <View style ={Styles.calendar}>
        <Calendar 
            style ={Styles.calendar}
            headerStyle={{paddingTop: 5}}
            markingType={'period'}>
                current = {new Date()}
                onDayPress={(event) => {setSelected(event, selected)}}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: Colors.krGreen,
                    dayTextColor: '#2d4150',
                    textDisabledColor: '',
                }}         
        </Calendar>
        
    </View>
    <View style={Styles.agenda}>
        <Text>{selected}</Text>
        <Text>lolololololllllllllllllllllllllllllllllllllllllllllllllllloooooooooooooooooooooooooooooooooooooooooooooo</Text>
    </View>
</View>
  )
}

export default OwnSubstitutionsScreen