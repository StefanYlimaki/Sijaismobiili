import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
} from 'react-native'
import { Slider } from '@rneui/themed'
import {Icon} from '@rneui/base'

import {logUserData} from '../utils/logUserData'
import * as Colors from '../assets/styles/colors.js'
import styles from '../assets/styles/styles'
import { setUserData } from '../utils/setUserData'

const UserInfoView = ({ user, setUser }) => {

  const [morning, setMorning] = useState(user.preferences.morning)
  const [evening, setEvening] = useState(user.preferences.evening)
  const [night, setNight] = useState(user.preferences.night)
  const [pay, setPay] = useState(user.preferences.pay)
  const [fullShift, setFullShift] = useState(user.preferences.fullShift)
  const [distance, setDistance] = useState(user.preferences.distance)

  const handleChange = async (event, key, subKey) => {
    try {
      const newUser = {...user}
      if(subKey){
        delete newUser[key][subKey]
        newUser[key][subKey] = event
      } else {
        const value = event.nativeEvent.text
        delete newUser[key]
        newUser[key] = value
      }
      setUserData(newUser)
      setUser(newUser)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.userContainer}>
      <TouchableWithoutFeedback>
        <ScrollView style={styles.userContent}>
          <View>
            <Text>
              <Text style={styles.h1}>Moi,</Text>
              <Text style={[styles.h1, { color: Colors.krBlue, fontFamily: 'Inter-DisplayExtraBold' }]}> {user.firstname}!</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.h2}>
              Henkilötiedot
            </Text>
            <Text style={styles.textfieldlist}>Etunimi</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={user.firstname}
              onEndEditing={(e) => handleChange(e, 'firstname')}
            />
            <Text style={styles.textfieldlist}>Sukunimi</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={user.lastname}
              onEndEditing={(e) => handleChange(e, 'lastname')}
            />
            <Text style={styles.textfieldlist}>Sähköpostiosoite</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={user.email}
              keyboardType="email-address"
              onEndEditing={(e) => handleChange(e, 'email')}
            />
            <Text style={styles.textfieldlist}>Puhelinnumero</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={user.phoneNumber}
              keyboardType="phone-pad"
              onEndEditing={(e) => handleChange(e, 'phoneNumber')}
            />
            <Text style={styles.textfieldlist}>Katuosoite</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={user.adress}
              onEndEditing={(e) => handleChange(e, 'address')}
            />
            <Text style={styles.textfieldlist}>Postinumero</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={user.postNumber}
              keyboardType="numeric"
              onEndEditing={(e) => handleChange(e, 'postNumber')}
            />
            <Text style={styles.textfieldlist}>Kunta</Text>
            <TextInput
              editable
              style={styles.input}
              default={user.city}
              onEndEditing={(e) => handleChange(e, 'city')}
            />
            <Text style={styles.textfieldlist}>Henkilötunnus</Text>
            <TextInput
              editable
              style={styles.input}
              default={user.personNumber}
              onEndEditing={(e) => handleChange(e, 'personNumber')}
            />           
            <Text style={styles.textfieldlist}>Valviran rekisteröintinumero</Text>
            <TextInput
              editable
              style={styles.input}
              default={user.valviraID}
              keyboardType="numeric"
              onEndEditing={(e) => handleChange(e, 'valviraID')}
            />
          </View>
          <Button title='log user' onPress={() => logUserData()} />
          <Text style={styles.textfieldlist}></Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

const thumbTheme = (y) => {
  if (y === 1) {
    return Colors.danger
  }
  if (y === 2) {
    return Colors.warning
  }
  if (y === 3) {
    return Colors.krGreen
  }
  if (y === 4) {
    return Colors.info
  }
  if (y === 5) {
    return Colors.success
  }
}
const thumbIcon = (y) => {
  if (y === 1) {
    return 'heart-off'
  }
  if (y === 2) {
    return 'emoticon-neutral'
  }
  if (y === 3) {
    return 'emoticon-happy'
  }
  if (y === 4) {
    return 'emoticon'
  }
  if (y === 5) {
    return 'heart-multiple'
  }
}

export default UserInfoView