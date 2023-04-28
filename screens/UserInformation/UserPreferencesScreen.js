import React, { useEffect, useState } from 'react'
import * as userData from '../../assets/data/userData.json'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, ActivityIndicator,
} from 'react-native'
import { Slider } from '@rneui/themed'
import styles from '../../assets/styles/styles'
import {Icon} from '@rneui/base'
import { getUserData } from '../../utils'
import { setUserData } from '../../utils/setUserData'
import { AntDesign } from '@expo/vector-icons'
import {colors} from '../../assets/styles/colors.js'
import OrderPreferences from '../../components/OrderPreferences'
import { NestableScrollContainer } from 'react-native-draggable-flatlist'

function UserPreferencesScreen() {
  delete userData['default']

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [morning, setMorning] = useState()
  const [evening, setEvening] = useState()
  const [night, setNight] = useState()
  const [pay, setPay] = useState()
  const [fullShift, setFullShift] = useState()
  const [distance, setDistance] = useState()
  const [preferenceOrder, setPreferenceOrder] = useState()

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setUser(user)
      setLoading(false)
      setMorning(user.preferences.morning)
      setEvening(user.preferences.evening)
      setNight(user.preferences.night)
      setPay(user.preferences.pay)
      setFullShift(user.preferences.fullShift)
      setDistance(user.preferences.distance)
      setPreferenceOrder(user.preferences.preferenceOrder)
    }

    fetchUserData()
  },[])

  //Used by OrderPreferences to update the set data to memory
  const handleOrderChange = (data) => {
    //Update data indexes
    console.log(data)
    const updatedData = data.map((item, index) => {
      const tempObj = {
        key: item.key,
        label: item.label,
        index: index
      }
      console.log(tempObj)
      return tempObj
    })
    // Update state
    setPreferenceOrder(updatedData)
    // Update internal storage
    try {
      const newUser = {...user}
      delete newUser['preferences']['preferenceOrder']
      newUser['preferences']['preferenceOrder'] = updatedData
      
      setUserData(newUser)
      setUser(newUser)
    } catch (error) {
      console.log(error)
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
      setUserData(newUser)
      setUser(newUser)
    } catch (error) {
      console.log(error)
    }
  }

  if(loading){
    return(
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator size="large" color= {colors.krBlue} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
    //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback>
        <NestableScrollContainer>
          <ScrollView style={styles.userContent}>
            <View>
              <Text style={styles.h1}>
                <Text>Moi,</Text>
                <Text style={{ color: colors.krBlue, fontFamily: 'Inter-DisplayExtraBold' }}> {user.firstname}!</Text>
              </Text>
            </View>
          
            <View>
              <View style={styles.h2AndInfoButton}>
                <Text style={styles.h2}>
                Enimmäisetäisyys
                </Text>
                <View style={{paddingLeft: 12.5}}>
                  <AntDesign name="infocirlceo" size={24} color="black" />
                </View>
              </View>
              <Text style={styles.currentDistance}>
                {distance} km
              </Text>
              <Slider
                maximumValue={300}
                minimumValue={1}
                minimumTrackTintColor={colors.blueBright}
                step={1}
                trackStyle={{ height: 10, backgroundColor: 'transparent', borderRadius: 5 }}
                thumbStyle={{ height: 30, width: 30, backgroundColor: colors.blueBright, borderRadius: 15 }}
                value={user.preferences.distance}
                onSlidingComplete={(event) => handleChange(event, 'preferences', 'distance')}
                onValueChange={(event) => setDistance(event)}
              />
            </View>
            <View style={styles.h2AndInfoButton}>
              <Text style={styles.h2}>
              Mieltymykset
              </Text>
              <View style={{paddingLeft: 12.5}}>
                <AntDesign name="infocirlceo" size={24} color="black" />
              </View>
            </View>
            <View style={[styles.sliderList,{textAlign:'center'}]}>
              <View >
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
              <View>
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
              <View>
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
              <View>
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
              <View>
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
            <View style={styles.h2AndInfoButton}>
              <Text style={styles.h2}>
                Tärkeintä minulle on...
              </Text>
              <View style={{paddingLeft: 12.5}}>
                <AntDesign name="infocirlceo" size={24} color="black" />
              </View>
            </View>
            { preferenceOrder && <OrderPreferences preferenceOrder={preferenceOrder} setPreferenceOrder={handleOrderChange}/> }
          </ScrollView>
        </NestableScrollContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default UserPreferencesScreen

const thumbTheme = (y) => {
  if (y === 1) {
    return colors.danger
  }
  if (y === 2) {
    return colors.warning
  }
  if (y === 3) {
    return colors.krGreen
  }
  if (y === 4) {
    return colors.blueBright
  }
  if (y === 5) {
    return colors.success
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