import React, { useEffect, useState } from 'react'
import * as userData from '../assets/data/userData.json'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../assets/styles/styles'
import { getUserData } from '../utils/getUserData'
  
function UserInfoScreen() {
  delete userData['default']

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(userData)


  useEffect(() => {
    async function storeData() {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData))
        const newUser = await AsyncStorage.getItem('user')
        setUser(JSON.parse(newUser))
        setLoading(false)
      } catch (e) {
        // saving error
      }
    }
    storeData()
  },[])

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
      await AsyncStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
    } catch (error) {
      console.log(error)
    }
  }

  if(loading){
    return(
      <View>
        <Text>Ladataan, hetki vain.</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.userContainer}
    //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback>
        <ScrollView style={styles.userContent}>
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
          <Button title='log user' onPress={() => getUserData()} />
          <Text style={styles.textfieldlist}></Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default UserInfoScreen