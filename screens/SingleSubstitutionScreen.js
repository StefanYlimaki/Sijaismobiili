import { Pressable, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { formatHourlyPay, formatDate, formatTime } from '../utils/'
import styles from '../assets/styles/styles'
import DenyBookmarkAndAcceptButton from '../components/DenyBookmarkAndAcceptButtons'
import acceptSubstitution from '../utils/acceptSubstitution'

const SingleSubstitutionScreen = ({ route, navigation }) => {
  const { substitution } = route.params

  // The following is needed for the local notification to work
  if(substitution.item === undefined) {
    substitution.item = substitution
  }

  const benefits = substitution.item.benefits.map((benefit, i) => {
    return (
      <View style={styles.substitutionItemBenefitsItem}
        key={i}
      >
        <Text
          style={{fontSize: 10, color: 'white'}}
        >
          {benefit}
        </Text>
      </View>
    )
  })

  return (
    <View style={styles.singleSubstitutionContainer}>
      <Pressable onPress={()=>navigation.pop()}
        style={{paddingHorizontal:16}}
      >
        <FontAwesome5 name='arrow-left' size={32}/>
      </Pressable>
      <View style={styles.singleSubstitutionTopElement}>
        <View style={{alignSelf: 'flex-start'}}>
          <View>
            <Text style={{ fontSize: 24, paddingVertical: 8, }}>
              {substitution.item.title}
            </Text>
          </View>
          <View >
            <Text style={{ fontSize: 30}}>
              {substitution.item.department}
            </Text>
          </View>
        </View>
        <View style={styles.singleSubstitutionBenefitsContainer}>
          {benefits}
        </View>
      </View>
      <View style={styles.singleSubstitutionInfoContainer}>
        <View >
          <Text style={[styles.whiteText, {alignSelf: 'flex-start'}]}>
            {formatDate(substitution.item.timing.startTime)}
          </Text>
          <Text style={[styles.whiteText, {alignSelf: 'flex-start'}]}>
            {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
          </Text>
        </View>
        <View>
          <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {formatHourlyPay(substitution.item.hourlyPay)}€/h
            </Text>
            <Text style={{color:'white'}}>
              {'(~' + Math.floor(substitution.item.hourlyPay * (substitution.item.timing.duration/60)) + '€)'}
            </Text>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.whiteText}>{substitution.item.location}</Text>
          </View>
        </View>
      </View>
      <View style={styles.substitutionElement}>
        <Text style={{ paddingHorizontal: 32, paddingVertical: 16}}>
          {substitution.item.description}
        </Text>
      </View>
      <DenyBookmarkAndAcceptButton
        denyCallback={()=>console.log('deny')}
        acceptCallback={()=>acceptSubstitution(substitution.item)}
        bookmarkCallback={()=>console.log('bookmark')}
      />
    </View>
  )
}

export default SingleSubstitutionScreen
