import { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { colors } from '../../assets/styles/colors'
import style from '../../assets/styles/styles'
import { Icon } from '@rneui/themed'

function saveAvailability(startDate, endDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
  let recurringDates = []

  if(sunday) {
    recurringDates.push(0)
  }
  if(monday) {
    recurringDates.push(1)
  }
  if(tuesday) {
    recurringDates.push(2)
  }
  if(wednesday) {
    recurringDates.push(3)
  }
  if(thursday) {
    recurringDates.push(4)
  }
  if(friday) {
    recurringDates.push(5)
  }
  if(saturday) {
    recurringDates.push(6)
  }

  if(recurringDates.length === 0) {
    recurringDates.push(-1)
  }
  
  /*
   * Availability saved as startDate, endDate (optional, alternatively '-') and
   * a list of recurring weekdays (optional, alternatively [-1]).
   * Weekdays are set as 0-6 where 0 = sunday, 1 = monday...
   */
  const availability = {
    startDate: startDate,
    endDate: endDate ? endDate : '-',
    recurring: recurringDates
  }

  console.log('TODO: Add to a list in user data')
}

function EditAvailabilityScreen() {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState()
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)
  const [saturday, setSaturday] = useState(false)
  const [sunday, setSunday] = useState(false)

  return (
    <View style={availabilityStyles.screenContainer}>
      <Text style={[style.blackText, {fontWeight: 'bold', marginVertical: 10, marginLeft: 10}]}>Aseta poissaolo</Text>
      <View style={availabilityStyles.dateSection}>
        <View>
          <Text style={style.blackText}>Alkaen</Text>
          <View style={availabilityStyles.dateContainer}>
            <Text style={[style.blackText, {textAlign: 'center'}]}>{startDate.getDate() + '.' + (startDate.getMonth() + 1) + '.' + startDate.getFullYear()}</Text>
          </View>
        </View>
        <View>
          <Text style={style.blackText}>Päättyen</Text>
          <Pressable style={availabilityStyles.dateContainer} onPress={() => console.log('TODO: open calendar')}>
            <Text style={[style.blackText, {textAlign: 'center'}]}>-</Text>
          </Pressable>
        </View>
      </View>

      <View style={availabilityStyles.sectionDivider} />

      <Text style={[style.blackText, {fontWeight: 'bold', marginTop: 20, marginLeft: 10}]}>Toistuu</Text>

      <View style={availabilityStyles.checkboxContainer}>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setMonday(!monday)}>
          <Text>Ma</Text>
          <Icon name={monday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setTuesday(!tuesday)}>
          <Text>Ti</Text>
          <Icon name={tuesday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setWednesday(!wednesday)}>
          <Text>Ke</Text>
          <Icon name={wednesday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setThursday(!thursday)}>
          <Text>To</Text>
          <Icon name={thursday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setFriday(!friday)}>
          <Text>Pe</Text>
          <Icon name={friday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setSaturday(!saturday)}>
          <Text>La</Text>
          <Icon name={saturday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
        <Pressable style={availabilityStyles.checkbox} onPress={() => setSunday(!sunday)}>
          <Text>Su</Text>
          <Icon name={sunday ? 'checkbox-marked' : 'checkbox-blank-outline'} type="material-community" size={30} color={style.blackText}/>
        </Pressable>
      </View>

      <View style={availabilityStyles.sectionDivider} />

      <View style={availabilityStyles.saveSection}>
        <Pressable style={availabilityStyles.saveButton} onPress={() => saveAvailability(startDate, endDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday)}>
          <Text style={[style.buttonText, {textAlign: 'center'}]}>Tallenna</Text>
        </Pressable>
      </View>
      
    </View>
  )
}

const availabilityStyles = StyleSheet.create({
  checkbox: {
    alignItems: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  dateContainer: {
    backgroundColor: colors.krGray,
    borderRadius: 7,
    paddingVertical: 5,
    width: 90
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  saveButton: {
    backgroundColor: colors.krGreen,
    borderRadius: 7,
    paddingVertical: 5,
    width: 90
  },
  saveSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 40
  },
  screenContainer: {
    margin: 15
  },
  sectionDivider: {
    borderBottomWidth: 1
  },
})
export default EditAvailabilityScreen