import { Text, View } from 'react-native'
import {Calendar, LocaleConfig, DateData, CalendarProvider, CalendarContext} from 'react-native-calendars'
import React, { useState, useEffect } from 'react'

import Styles from '../../assets/styles/styles'
import * as Colors from '../../assets/styles/colors.js'
import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import UpcomingGigs from '../../components/UpcomingGigs'
import { getUserData } from '../../utils'
import NavigateToSavedSubstitutionsButton from '../../components/NavigateToSavedSubstitutionsButton'


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
    today: 'Tänään'
  }
  LocaleConfig.defaultLocale = 'fi'

  let today = new Date().toDateString()
  const [selected, setSelected] = useState(today)
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
    <View style= {{justifyContent: 'space-between'}}>
      <NavigateToSavedSubstitutionsButton navigation={navigation}/>
      <View style ={Styles.calendar}>
        <Calendar 
          style ={Styles.calendar}
          headerStyle={{paddingTop: 5}}
          firstDay = {1}
          markingType={'custom'}
          markedDates={{
            selected: {
              customStyles: {
                container: {
                  backgroundColor: 'green'
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold'
                }
              }
            },
          }}
          onDayPress={() => setSelected(selected)}
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
      </View>
        
      <View style={{paddingHorizontal: '5%'}}>
        <View style={Styles.agenda}>
          <Text style={{textAlign: 'left', fontWeight: 'bold'}}>{selected}{selected == today ? <Text> (tänään)</Text>: null}{'\n'}{'\n'}</Text>
          <Text style={{textAlign: 'center'}}>Ei merkintöjä.{'\n'}{'\n'}</Text>
        </View>
      </View>
      
      {userSubstitutions && <UpcomingGigs substIDs={userSubstitutions} navigation={navigation}/>}
    </View>
  )
}

export default OwnSubstitutionsScreen