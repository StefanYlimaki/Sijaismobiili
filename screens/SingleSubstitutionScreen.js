import { Button, Text, View, StyleSheet } from 'react-native'
import {
  Ionicons,
  Feather,
  FontAwesome,
  Entypo,
  FontAwesome5,
} from '@expo/vector-icons'
import styles from '../assets/styles/styles'

const SingleSubstitutionScreen = ({ route, navigation }) => {
  const { substitution } = route.params
  return (
    <View style={styles.substitutionContainer}>
      <View style={styles.substitutionElement}>
        <Text style={{ fontSize: 24, paddingVertical: 8 }}>
          {substitution.item.title}
        </Text>
      </View>
      <View style={styles.substitutionElement}>
        <Feather
          name="clock"
          size={24}
          color="black"
          style={{
            paddingRight: 16,
            paddingVertical: 8,
          }}
        />
        <Text>{substitution.item.date}</Text>
      </View>
      <View style={styles.substitutionElement}>
        <FontAwesome5
          name="coins"
          size={24}
          color="black"
          style={{
            paddingRight: 16,
            paddingVertical: 8,
          }}
        />
        <Text>{substitution.item.hourlyPay}€/h</Text>
      </View>
      <View style={styles.substitutionElement}>
        <Entypo
          name="location-pin"
          size={24}
          color="black"
          style={{
            paddingRight: 16,
            paddingVertical: 8,
          }}
        />
        <Text>{substitution.item.location}</Text>
      </View>
      <View style={styles.substitutionElement}>
        <Ionicons
          name="ios-file-tray-stacked"
          size={24}
          color="black"
          style={{
            paddingRight: 16,
            paddingVertical: 8,
          }}
        />
        <Text style={{ paddingRight: 32 }}>
          {substitution.item.description}
        </Text>
      </View>
    </View>
  )
}

export default SingleSubstitutionScreen
