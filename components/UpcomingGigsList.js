import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { formatHourlyPay, formatDate, formatTime } from '../utils'
import calculateDistance from '../utils/calculateDistance'
import styles from '../assets/styles/styles'
import { colors } from '../assets/styles/colors'

function GigListItem({ substitution, navigation }) {
  const getDistance = () => {
    return calculateDistance(parseFloat(substitution.item.coordinates.latitude), parseFloat(substitution.item.coordinates.longitude), 65.05941, 25.46642, false)
  }

  {
    /* TODO: Refactor to use SubstitutionItem,
      add param to SubstitutionItem to determine whether to show SubstitutionCard or SingleSubstitutionScreen
    */
  }
  return (
    <View style={styles.substitutionItemContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate('SingleSubstitution', {
            substitution: substitution,
            navigation: navigation
          })
        }
        style={({ pressed }) => pressed && styles.pressedSubstitutionItem}
      >
        <View style={styles.substitutionPreviewComponent}>
          <View style={
            substitution.item.needsConfirmation ?
              [styles.substitutionPreviewComponentTopElement, {backgroundColor: '#DE841D'}]
              : styles.substitutionPreviewComponentTopElement}>
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <Text style={substitution.item.needsConfirmation ? styles.blackText : styles.whiteText}>
                {formatDate(substitution.item.timing.startTime)}
              </Text>
              <Text style={substitution.item.needsConfirmation ? styles.blackText : styles.whiteText}>
                {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 2 }}>
              <Text style={substitution.item.needsConfirmation ? styles.substItemOrganisationTextDark : styles.substItemOrganisationText}>
                {substitution.item.organisation}
              </Text>
              <Text style={substitution.item.needsConfirmation ? styles.blackText : styles.whiteText}>
                {getDistance(substitution.item.location)}
              </Text>
            </View>
          </View>
          <View style={styles.substitutionPreviewComponentBottomElement}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={[styles.blackText, { fontSize: 20, fontFamily: 'Inter-DisplayBold' }]}>
                  {substitution.item.title}
                </Text>
                <Text style={[styles.blackText, { paddingRight: 8, fontFamily: 'Inter-DisplayMedium', fontSize: 15 }]}>
                  {substitution.item.department}
                </Text>
              </View>

              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={[styles.blackText, { paddingRight: 8, fontWeight: 'bold' }]}>
                    {formatHourlyPay(substitution.item.hourlyPay)}€/h
                  </Text>
                  <Text style={[styles.blackText, { paddingRight: 16 }]}>
                    (~{formatHourlyPay((substitution.item.timing.duration / 60) * substitution.item.hourlyPay)} €)
                  </Text>
                </View>
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
              </View>
            </View>
            {substitution.item.needsConfirmation &&
              <Text style={{marginTop: 7}}>Työnantaja ei ole vielä vahvistanut ilmoittautumistasi</Text>
            }
          </View>
        </View>
        {/* Display an overlay if the gig is expired and the user has not been confirmed */}
        { substitution.item.needsConfirmation && substitution.item.timing.startTime < new Date(Date.now()).toISOString() &&
          <View style={gigListStyles.expiredOverlay}>
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
              <View style={{backgroundColor: colors.danger, padding: 7, borderRadius: 10}}>
                <Text style={styles.buttonText}>Valitettavasti et saanut tätä keikkaa</Text>
              </View>
            </View>
          </View>
        }
      </Pressable>
      
    </View>
  )
}

function UpcomingGigsList({ route, navigation }) {

  const { sortedGigs } = route.params

  return (
    <View style={gigListStyles.gigListContainer}>
      <FlatList
        data={sortedGigs}
        renderItem={
          (substitution) => { return <GigListItem substitution={substitution} navigation={navigation} /> }
        }
        keyExtractor={(substitution) => {
          return substitution.id
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const gigListStyles = StyleSheet.create({
  expiredOverlay: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  gigListContainer: {
    paddingBottom: 10,
  }
})

export default UpcomingGigsList