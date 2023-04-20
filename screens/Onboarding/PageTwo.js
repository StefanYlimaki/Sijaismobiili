import { View, Text, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Slider } from '@rneui/themed'
import {Icon} from '@rneui/base'
import { useState, useEffect } from 'react'
import {colors} from '../../assets/styles/colors.js'

import styles from '../../assets/styles/styles'
import { getUserData } from '../../utils/getUserData'

const PageTwo = ({ setPageToRender, handleChange }) => {

  const [morning, setMorning] = useState()
  const [evening, setEvening] = useState()
  const [night, setNight] = useState()
  const [pay, setPay] = useState()
  const [fullShift, setFullShift] = useState()

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setMorning(user.preferences.morning)
      setEvening(user.preferences.evening)
      setNight(user.preferences.night)
      setPay(user.preferences.pay)
      setFullShift(user.preferences.fullShift)
    }

    fetchUserData()
  },[])

  return(
    <View>
      <Text>Kerro mieltymyksesi</Text>
      <Text>Älä huoli, voit muuttaa valintoja ihan milloin haluat.</Text>
      <View>
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
      </View>
      <Button title='Jatka' onPress={() => setPageToRender(3)}/>
    </View>
  )
}

export default PageTwo

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