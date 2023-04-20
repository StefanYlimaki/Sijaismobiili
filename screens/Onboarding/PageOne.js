import { useState, useEffect } from 'react'
import { Pressable, Button, Text, View, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Slider } from '@rneui/themed'
import {Icon} from '@rneui/base'
import SubstitutionItem from '../../components/SubstitutionItem'
import styles from '../../assets/styles/styles'
import {colors} from '../../assets/styles/colors.js'
import substitutions from '../../assets/data/substitutionsData_new.json'
import { getUserData } from '../../utils/getUserData'

const PageOne = ({ handleChange, setPageToRender }) => {
  const [morning, setMorning] = useState()

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setMorning(user.preferences.morning)
    }
    fetchUserData()
  },[])


  return(
    <View>
      <Text>Keikkoja, joista pidät</Text>
      <Text>Kerro meille mistä pidät</Text>
      <Text>Me kerromme missä viihdyt</Text>
      <SubstitutionElement />
      <SubstitutionElement />
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
      <Button title='Jatka' onPress={() => setPageToRender(2)}/>
    </View>
  )
}

const SubstitutionElement = () => {
  return(
    <View><Text>SubstitutionElement</Text></View>
  )
}

export default PageOne

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