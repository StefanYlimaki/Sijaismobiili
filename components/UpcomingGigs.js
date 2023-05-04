import { View, Text, StyleSheet, Pressable } from 'react-native'
import style from '../assets/styles/styles'
import { formatDate, formatTime } from '../utils'
import calculateDistance from '../utils/calculateDistance'
import substitutions from '../assets/data/substitutionsData_new.json'
import { colors } from '../assets/styles/colors'

function EmptyGigs() {
  return (
    <View style={cardStyles.cardContainer}>
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
      <View style={cardStyles.cardContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate('SingleSubstitution', {
              substitution: nextGig,
              navigation: navigation
            })
          }
          style={({ pressed }) => pressed && style.pressedSubstitutionItem}
        >
          <View style={[style.substitutionPreviewComponentTopElement, cardStyles.cardHeader]}>
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <Text style={style.whiteText}>
                {formatDate(nextGig.timing.startTime)}
              </Text>
              <Text style={style.whiteText}>
                {formatTime(nextGig.timing.startTime, nextGig.timing.duration)}
              </Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 2 }}>
              <Text style={cardStyles.organisationText}>
                {nextGig.organisation}
              </Text>
              <Text style={style.whiteText}>
                {getDistance(nextGig)}
              </Text>
            </View>
          </View>

          <View style={cardStyles.cardBody}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={[style.blackText, { fontSize: 20, fontFamily: 'Inter-DisplayBold' }]}>
                {nextGig.title}
              </Text>
              <Text style={[style.blackText, { paddingRight: 8, fontFamily: 'Inter-DisplayMedium', fontSize: 15 }]}>
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
    paddingBottom: 16,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    minHeight: 130
  },
  cardFooter: {
    backgroundColor: '#AAC4C5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 4,
  },
  cardHeader: {
    borderWidth: 1,
    flexDirection: 'row'
  },
  emptyCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 130
  },
  organisationText: {
    color: colors.textLight,
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 12,
    opacity: 0.85,
    textAlign: 'right',
  }
})

export default UpcomingGigs