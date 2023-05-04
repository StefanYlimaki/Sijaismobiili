import { View, Text, StyleSheet, Pressable , Animated} from 'react-native'
import { formatHourlyPay, formatDate, formatTime } from '../utils'
import styles from '../assets/styles/styles'
import calculateDistance from '../utils/calculateDistance'
import {Feather, Ionicons} from '@expo/vector-icons'
import {backgroundColor} from 'react-native-calendars/src/style'
import {colors} from '../assets/styles/colors'
import { fontSizes } from '../assets/styles/styles'

const SubstitutionItem = ({ substitution, navigation, isBookmarked, update }) => {

  const getDistance = () => {
    return calculateDistance(parseFloat(substitution.item.coordinates.latitude), parseFloat(substitution.item.coordinates.longitude), 65.05941, 25.46642, false)
  }

  return (
    <Animated.View style={styles.substitutionItemContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate('SubstitutionCard', {
            substitution: substitution,
            navigation: navigation,
            updateList: () => {update(true)}
          })
        }
        }
        style={({ pressed }) => pressed && styles.pressedSubstitutionItem}>
        <View style={styles.substitutionPreviewComponent}>
          <View style={styles.substitutionPreviewComponentTopElement}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flexDirection: 'column', flex: 5, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', flex: 1}}>
                    <Feather name='calendar' size={fontSizes.md} color='white'/>
                    <Text style={[styles.whiteText, { marginLeft: 5, fontSize: fontSizes.md }]}>
                      {formatDate(substitution.item.timing.startTime)}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', flex: 2, alignItems: 'flex-start'}}>
                    <Feather name='clock' size={fontSizes.md} color='white'/>
                    <Text style={[styles.whiteText, { marginLeft: 5, fontSize: fontSizes.md }]}>
                      {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'flex-end', flexBasis: 50}}>
                <View style={{flexDirection: 'row'}}>
                  <Feather
                    accessibilityLabel="Etäisyys"
                    name='map-pin' size={fontSizes.md} color='white'/>
                  <Text style={[styles.whiteText, { marginLeft: 5}]}>
                    {getDistance(substitution.item.location)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

        </View>

        <View style={styles.substitutionPreviewComponentBottomElement}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>


            <View style={{ flexDirection: 'column', justifyContent: 'flex-start'}}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 4}}>
                <Ionicons name="cash-outline" size={15} style={styles.blackText} />
                <Text style={[styles.blackText, { fontWeight: 'bold' }]}>
                  {formatHourlyPay(substitution.item.hourlyPay)}€/h
                </Text>
                <Text style={styles.blackText}>
                  (~{formatHourlyPay((substitution.item.timing.duration / 60) * substitution.item.hourlyPay)} €)
                </Text>
              </View>

              <Text style={[styles.blackText, { fontSize: fontSizes.xl, fontFamily: 'Inter-DisplayBold'}]}>
                {substitution.item.title}
              </Text>
              <Text style={[styles.blackText, { paddingRight: 8, fontFamily: 'Inter-DisplayMedium', fontSize: fontSizes.md}]}>
                {substitution.item.department}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignContent: 'flex-end'}}>

              {!isBookmarked? null : (
                <Ionicons name='bookmark' color={colors.krBlueDark} size={fontSizes.xxl} style={{ marginRight: 10, alignSelf: 'flex-end'}} />
              )}

              {substitution.item.benefits.length !== 0
                ? <View>
                  {substitution.item.benefits.map(b =>
                    <View key={b} style={styles.substitutionItemBenefitsItem} >
                      <Text style={styles.whiteText} >
                        {b}
                      </Text>
                    </View>
                  )}
                </View>
                : <></>
              }
              {/* for testing purposes, displays scores of the tailored substitution list
                  <Text>
                    {substitution.item.points}
                  </Text>
                */}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default SubstitutionItem
