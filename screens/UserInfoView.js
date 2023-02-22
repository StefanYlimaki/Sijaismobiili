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
              minimumTrackTintColor={'#d9d9d9'}
              maximumTrackTintColor={'#d9d9d9'}
              thumbProps={{
                children: (
                  <Icon
                    name={thumbIcon(morning)}
                    type="material-community"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={thumbTheme(morning)}
                  />
                ),
              }}
              step={1}
              allowTouchTrack={true}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              value={morning}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'morning')}
              onValueChange={(event) => setMorning(event)}
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
              minimumTrackTintColor={'#d9d9d9'}
              maximumTrackTintColor={'#d9d9d9'}
              thumbProps={{
                children: (
                  <Icon
                    name={thumbIcon(evening)}
                    type="material-community"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={thumbTheme(evening)}
                  />
                ),
              }}
              step={1}
              allowTouchTrack={true}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              value={evening}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'evening')}
              onValueChange={(event) => setEvening(event)}
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
              minimumTrackTintColor={'#d9d9d9'}
              maximumTrackTintColor={'#d9d9d9'}
              thumbProps={{
                children: (
                  <Icon
                    name={thumbIcon(night)}
                    type="material-community"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={thumbTheme(night)}
                  />
                ),
              }}
              step={1}
              allowTouchTrack={true}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              value={night}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'night')}
              onValueChange={(event) => setNight(event)}
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
              minimumTrackTintColor={'#d9d9d9'}
              maximumTrackTintColor={'#d9d9d9'}
              thumbProps={{
                children: (
                  <Icon
                    name={thumbIcon(pay)}
                    type="material-community"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={thumbTheme(pay)}
                  />
                ),
              }}
              step={1}
              allowTouchTrack={true}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              value={pay}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'pay')}
              onValueChange={(event) => setPay(event)}
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
              minimumTrackTintColor={'#d9d9d9'}
              maximumTrackTintColor={'#d9d9d9'}
              thumbProps={{
                children: (
                  <Icon
                    name={thumbIcon(fullShift)}
                    type="material-community"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={thumbTheme(fullShift)}
                  />
                ),
              }}
              step={1}
              allowTouchTrack={true}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 10 }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              value={fullShift}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'fullShift')}
              onValueChange={(event) => setFullShift(event)}
            />
          </View>

          <View>
            <Text style={styles.h2}>
              Etäisyys
            </Text>
            <Text style={styles.currentDistance}>
              {distance} km
            </Text>

            <Slider
              maximumValue={300}
              minimumValue={1}
              step={1}
              thumbProps={{
                children: (
                  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <Text style={{fontSize: 14 }}>{distance}</Text>
                  </View>
                ),
              }}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 5 }}
              thumbStyle={{ height: 30, width: 30, backgroundColor: Colors.krBlue, borderRadius: 15 }}
              value={user.preferences.distance}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'distance')}
              onValueChange={(event) => setDistance(event)}
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