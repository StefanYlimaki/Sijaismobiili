import React, { useEffect, useState } from 'react'
import * as userData from '../assets/data/userData.json'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Slider } from '@rneui/themed'
import * as Colors from '../assets/styles/colors.js'
import styles from '../assets/styles/styles'
import {Icon} from '@rneui/base'

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
    return Colors.blueBright
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
  
function UserPreferencesScreen() {
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
            <Text>
              <Text style={styles.h1}>Moi,</Text>
              <Text style={[styles.h1, { color: Colors.krBlue, fontFamily: 'Inter-DisplayExtraBold' }]}> {user.firstname}!</Text>
            </Text>
          </View>
          
          <View>
            <Text style={styles.h2}>
              Enimmäisetäisyys
            </Text>
            <Text style={styles.currentDistance}>
              {distance} km
            </Text>
            <Slider
              maximumValue={300}
              minimumValue={1}
              minimumTrackTintColor={Colors.blueBright}
              step={1}
              trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 5 }}
              thumbStyle={{ height: 30, width: 30, backgroundColor: Colors.blueBright, borderRadius: 15 }}
              value={user.preferences.distance}
              onSlidingComplete={(event) => handleChange(event, 'preferences', 'distance')}
              onValueChange={(event) => setDistance(event)}
            />
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default UserPreferencesScreen
