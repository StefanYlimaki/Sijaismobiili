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
import Slider from '@react-native-community/slider'
import * as Colors from '../assets/styles/colors.js'
import styles from '../assets/styles/styles'



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


  // const [myText, setMyText] = useState(20);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value !== null) {
        console.log(JSON.parse(value))
      }
    } catch(e) {
      // error reading value
    }
  }

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
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.userContainer}
    //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback>
        <ScrollView style={[styles.userContent, styles.blackText]}>
          <View>
            <Button title='log user' onPress={() => getData()} />
            <Text>
              <Text style={styles.h1}>Moi,</Text>
              <Text style={[styles.h1, { color: Colors.krBlue, fontFamily: 'Inter-DisplayExtraBold' }]}> {user.firstname}!</Text>
            </Text>
            <Text style={{ textAlign: 'center' }}>Mitä työtä mielesi tekee?</Text>
          </View>
          <View style={styles.sliderList}>
            <Text style={styles.h2}>
              Mieltymykset
            </Text>
            <View style={styles.tag}>
              <Text style={styles.label}>
                Aamuvuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              minimumTrackTintColor={Colors.krGreen}
              maximumTrackTintColor={Colors.krGreen}
              step={1}
              value={user.preferences.morning}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'morning')}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Iltavuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={user.preferences.evening}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'evening')}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Yövuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={user.preferences.night}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'night')}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Palkka
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={user.preferences.pay}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'pay')}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Täydet vuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={user.preferences.fullShift}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'fullShift')}
            />
          </View>

          <View>
            <Text style={styles.h2}>
              Etäisyys
            </Text>
            <Text style={styles.currentDistance}>
              {user.preferences.distance} km
            </Text>

            <Slider
              maximumValue={300}
              minimumValue={1}
              step={1}
              value={user.preferences.distance}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'distance')}
            />

            <View style={styles.distanceSlider}>
              <Text>{1} km</Text>
              <Text>{300} km</Text>
            </View>
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
          <Text style={styles.textfieldlist}></Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default UserInfoScreen