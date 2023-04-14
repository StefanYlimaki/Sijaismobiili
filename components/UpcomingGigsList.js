import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { formatHourlyPay, formatDate, formatTime } from '../utils'
import calculateDistance from '../utils/calculateDistance'
import styles from '../assets/styles/styles'

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
          <View style={styles.substitutionPreviewComponentTopElement}>
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <Text style={styles.whiteText}>
                {formatDate(substitution.item.timing.startTime)}
              </Text>
              <Text style={styles.whiteText}>
                {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 2 }}>
              <Text style={styles.substItemOrganisationText}>
                {substitution.item.organisation}
              </Text>
              <Text style={styles.whiteText}>
                {getDistance(substitution.item.location)}
              </Text>
            </View>
          </View>
          <View style={styles.substitutionPreviewComponentBottomElement}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
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
          </View>
        </View>
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
  gigListContainer: {
    paddingBottom: 10,
  },
})

export default UpcomingGigsList