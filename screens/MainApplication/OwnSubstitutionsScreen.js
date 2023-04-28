import { Pressable, Text, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Styles from '../../assets/styles/styles'
import { colors } from '../../assets/styles/colors'

import UpcomingGigs from '../../components/UpcomingGigs'
import { getUserData } from '../../utils'
import NavigateToSavedSubstitutionsButton from '../../components/NavigateToSavedSubstitutionsButton'


const OwnSubstitutionsScreen = ({ navigation }) => {

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

      {getCalendar(isMonth)}

      <View style={{ paddingHorizontal: '5%' }}>
        <View>
          <Text style={Styles.h2}>{i18n.t('nextShift')}</Text>
          {userSubstitutions && <UpcomingGigs substIDs={userSubstitutions} navigation={navigation} />}
        </View>

        <Text style={Styles.h2}>Palkkakuitti</Text>
        <View style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: colors.krGray, borderColor: colors.textDark, borderRadius: 9, borderWidth: 1, padding: '5%', width: '100%' }}>
          <Text>Kuluneen kuun aikana olet ansainnut{'\n'}</Text>
          <Text style={{ fontFamily: 'Inter-DisplaySemiBold', fontSize: 20 }}>noin 0 €</Text>
          <Text>{'\n'}Tarkastele palkkakuittiasi</Text>
        </View>
      </View>
    </View>
  )
}

export default OwnSubstitutionsScreen