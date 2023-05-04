import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import styles from '../assets/styles/styles'
import { formatDate, formatTime } from '../utils'
import calculateDistance from '../utils/calculateDistance'
import substitutions from '../assets/data/substitutionsData_new.json'

function EmptyGigs() {
  return (
    <View style={cardStyles.upcomingGigsCard}>
      <View style={cardStyles.emptyCard}>
        <Text style={{ textAlign: 'center' }}>
          Et ole vielä kiinnittäytynyt keikkoihin.
        </Text>
      </View>
    </View>
  )
}

function UpcomingGigs({ substIDs, navigation }) {

  const userSubstitutions = substitutions.filter((subst) => {
    return substIDs.includes(subst.id)
  })
  const sortedGigs = [...userSubstitutions].sort((a, b) => ('' + a.timing.startTime).localeCompare(b.timing.startTime))

  const getDistance = (substitution) => {
    return calculateDistance(parseFloat(substitution.coordinates.latitude), parseFloat(substitution.coordinates.longitude), 65.05941, 25.46642, false)
  }

  if (sortedGigs.length !== 0) {
    const nextGig = sortedGigs[0]

    return (
      <View style={cardStyles.upcomingGigsCard}>
        <Pressable
          onPress={() =>
            navigation.navigate('SingleSubstitution', {
              substitution: nextGig,
              navigation: navigation
            })
          }
          style={({ pressed }) => pressed && styles.pressedSubstitutionItem}
        >
          <View style={[styles.substitutionPreviewComponentTopElement, cardStyles.cardHeader]}>
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <Text style={styles.whiteText}>
                {formatDate(nextGig.timing.startTime)}
              </Text>
              <Text style={styles.whiteText}>
                {formatTime(nextGig.timing.startTime, nextGig.timing.duration)}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 2 }}>
              <Text style={styles.substItemOrganisationText}>
                {nextGig.organisation}
              </Text>
              <Text style={styles.whiteText}>
                {getDistance(nextGig)}
              </Text>
            </View>
          </View>

          <View style={cardStyles.cardBody}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={[styles.blackText, { fontSize: 20, fontFamily: 'Inter-DisplayBold' }]}>
                {nextGig.title}
              </Text>
              <Text style={[styles.blackText, { paddingRight: 8, fontFamily: 'Inter-DisplayMedium', fontSize: 15 }]}>
                {nextGig.department}
              </Text>
            </View>
          </View>

          <Pressable 
            accessibilityRole="button"
            accessibilityLabel="Kaikki tulevat vuorot"
            accessibilityHint='Johtaa koko näytön listaukseen'
            onPress={() => { navigation.navigate('UpcomingGigsList', { sortedGigs: sortedGigs }) }}>
            <View style={cardStyles.cardFooter}>
              <Text style={{ textAlign: 'center' }}>Näytä kaikki tulevat vuorot ({sortedGigs.length})</Text>
            </View>
          </Pressable>
        </Pressable>
      </View>
    )
  } else {
    return <EmptyGigs />
  }
}

const cardStyles = StyleSheet.create({
  cardBody: {
    backgroundColor: '#D9D9D9',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  cardFooter: {
    backgroundColor: '#AAC4C5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    paddingVertical: 4,
  },
  cardHeader: {
    borderWidth: 1,
  },
  emptyCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 110
  },
  upcomingGigsCard: {
    marginHorizontal: 15,
  }
})

export default UpcomingGigs