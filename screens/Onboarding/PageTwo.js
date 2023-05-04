import { View, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Slider } from '@rneui/themed'
import { Icon } from '@rneui/base'
import { useState, useEffect } from 'react'

import { getUserData } from '../../utils/getUserData'
import { colors } from '../../assets/styles/colors'
import thumbIcon from '../../utils/thumbIcon'
import thumbTheme from '../../utils/thumbTheme'
import styles from '../../assets/styles/styles'

const PageTwo = ({ setStep, handleChange }) => {
  const [evening, setEvening] = useState()
  const [night, setNight] = useState()
  const [pay, setPay] = useState()
  const [fullShift, setFullShift] = useState()

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setEvening(user.preferences.evening)
      setNight(user.preferences.night)
      setPay(user.preferences.pay)
      setFullShift(user.preferences.fullShift)
    }
    fetchUserData()
  }, [])

  return (
    <View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 36, paddingBottom: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Kerro mieltymyksesi</Text>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 36 }}>
        <Text style={{ fontSize: 18, fontWeight: '500', width: '80%', textAlign: 'center' }}>Älä huoli, voit muuttaa valintoja ihan milloin haluat.</Text>
      </View>
      <View>
        <View style={styles.h2AndInfoButton}>
          <Text style={styles.h2}>
            Mieltymykset
          </Text>
        </View>
        <View style={[styles.sliderList, { textAlign: 'center' }]}>
          <View>
            <Text style={styles.label}>
              Iltavuorot
            </Text>
          </View>
          <Slider
            accessibilityRole='adjustable'
            accessibilityLabel="Iltavuoroliukuri"
            accessibilityHint='Pyyhi vasemmalle, jos et pidä iltavuoroista'
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
            accessibilityRole='adjustable'
            accessibilityLabel="Yövuoroliukuri"
            accessibilityHint='Pyyhi vasemmalle, jos et pidä yövuoroista'
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
              Täydet vuorot
            </Text>
          </View>
          <Slider
            accessibilityRole='adjustable'
            accessibilityLabel="Täysi vuoro -liukuri"
            accessibilityHint='Pyyhi oikealle, jos pidät kahdeksan tunnin vuoroista'
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
      <View style={{ paddingTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={{
          height: 80,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          elevation: 2,
          backgroundColor: colors.krBlue
        }}
        accessibilityRole='button'
        accessibilityLabel="Jatka"
        accessibilityHint='Tallentaa valintasi ja siirtyy eteenpäin'
        onPress={() => setStep(3)}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Jatka</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PageTwo