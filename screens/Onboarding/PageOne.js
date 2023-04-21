import { useState, useEffect } from 'react'
import { Button, Pressable, Text, View } from 'react-native'
import { Slider } from '@rneui/themed'
import { Icon } from '@rneui/base'

import { formatHourlyPay, formatDate, formatTime } from '../../utils'
import { getUserData } from '../../utils/getUserData'
import { colors } from '../../assets/styles/colors'
import styles from '../../assets/styles/styles'
import substitutions from '../../assets/data/substitutionsData_new.json'
import thumbIcon from '../../utils/thumbIcon'
import thumbTheme from '../../utils/thumbTheme'
import calculateDistance from '../../utils/calculateDistance'



const PageOne = ({ handleChange, setStep }) => {

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
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 36, paddingBottom: 12}}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Keikkoja, joista pidät</Text>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Kerro meille mistä pidät</Text>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 40 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Me kerromme missä viihdyt</Text>
      </View>

      {morning === 0 || morning === 1 || morning === 2
        ? 
        <>
          <SubstitutionElement substitution={substitutions[0]}/>
          <SubstitutionElement substitution={substitutions[5]}/>
        </>
        : 
        <>
          <SubstitutionElement substitution={substitutions[5]}/>
          <SubstitutionElement substitution={substitutions[0]}/>
        </>
      }
      
      <View style={{ paddingTop: 20 }}>
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
      <View style={{ paddingTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={{
          height: 80,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          elevation: 2,
          backgroundColor: colors.krBlue
        }} 
        onPress={() => setStep(2)}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Jatka</Text>
        </Pressable>
      </View>
    </View>
  )
}

const SubstitutionElement = ({ substitution }) => {
  const getDistance = () => {
    return calculateDistance(parseFloat(substitution.item.coordinates.latitude), parseFloat(substitution.item.coordinates.longitude), 65.05941, 25.46642, false)
  }
  substitution.item = substitution
  return(
    <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
      <View style={styles.substitutionPreviewComponentTopElement}>
        <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>
          <Text style={styles.whiteText}>
            {formatDate(substitution.item.timing.startTime)}
          </Text>
          <Text style={styles.whiteText}>
            {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
          </Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-end', flex:2}}>
          <Text style={styles.substItemOrganisationText}>
            {substitution.item.organisation}
          </Text>
          <Text style={styles.whiteText}>
            {getDistance(substitution.item.location)}
          </Text>
        </View>
      </View>
      <View style={styles.substitutionPreviewComponentBottomElement}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{ flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={[styles.blackText, { fontSize: 20, fontFamily: 'Inter-DisplayBold'}]}>
              {substitution.item.title}
            </Text>
            <Text style={[styles.blackText, { paddingRight: 8, fontFamily: 'Inter-DisplayMedium', fontSize: 15}]}>
              {substitution.item.department}
            </Text>
          </View>
          <View style={{ flexDirection: 'column'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={ [styles.blackText, { paddingRight: 8, fontWeight: 'bold'}]}>
                {formatHourlyPay(substitution.item.hourlyPay)}€/h
              </Text>
              <Text style={ [styles.blackText, { paddingRight: 16 }]}>
                    (~{formatHourlyPay((substitution.item.timing.duration / 60) * substitution.item.hourlyPay)} €)
              </Text>
            </View>
            {substitution.item.benefits.length !== 0
              ? <View>
                {substitution.item.benefits.map(b => 
                  <View key={ b } style={styles.substitutionItemBenefitsItem} >
                    <Text style={styles.whiteText} >
                      {b}
                    </Text>
                  </View>
                )}
              </View>
              :<></>
            }
            <Text>
              {substitution.item.points}
            </Text>
                
          </View>
        </View>
      </View>
    </View>
  )
}

export default PageOne
