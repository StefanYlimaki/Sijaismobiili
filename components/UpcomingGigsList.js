import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import substitutions from '../assets/data/substitutionsData_new.json'
import { formatTime } from '../utils'
import * as Colors from '../assets/styles/colors.js'
import { Icon } from '@rneui/themed'
import { BlurView } from 'expo-blur'

function GigListItem({ substitution }) {
  return (
    <View style={gigListStyles.listItem}>
      <View style={gigListStyles.listItemHead}>
        <Text>{formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}</Text>
        <Text>{substitution.item.organisation}</Text>
      </View>
      <Text>
        {substitution.item.title}
      </Text>
    </View>
  )
}

function UpcomingGigsList({ navigation }) {

  console.log('TODO, vaihda käyttämään hyväksyttyjä sijaisuuksia')

  return (
    <View style={gigListStyles.modalContainer}>
      <BlurView intensity={10} style={{ flex: 1, justifyContent: 'center' }}>
        <View style={gigListStyles.gigListContainer}>
          <View style={gigListStyles.gigListHeader}>
            <Pressable onPress={() => { navigation.pop() }}>
              <Icon name='close-circle-outline' type="material-community" color={Colors.textDark} />
            </Pressable>
          </View>
          <FlatList
            data={substitutions}
            renderItem={
              (substitution) => { return <GigListItem substitution={substitution} /> }
            }
            keyExtractor={(substitution) => {
              return substitution.id
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BlurView>
    </View>
  )
}

const gigListStyles = StyleSheet.create({
  gigListContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    maxHeight: '60%',
    paddingBottom: 10,
  },
  gigListHeader: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minHeight: 50,
    paddingRight: 15,
  },
  listItem: {
    backgroundColor: Colors.krGreenLight,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'space-around',
    margin: 5,
    minHeight: 55,
    padding: 5
  },
  listItemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center'
  }
})

export default UpcomingGigsList