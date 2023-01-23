import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Feather, Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons'

const SubstitutionItem = ({ substitution, navigation }) => {
  return (
    <View style={styles.substitutionItemContainer}>
      <Pressable
        android_ripple={{ color: '#210644' }}
        onPress={() =>
          navigation.navigate('Substitution', {
            substitution: substitution,
          })
        }
        style={({ pressed }) => pressed && styles.pressedSubstitutionItem}
      >
        <View style={styles.substitutionPreviewComponent}>
          <Feather
            name="clock"
            size={24}
            color="white"
            style={{ paddingRight: 12 }}
          />
          <Text style={styles.substitutionItemText}>
            {substitution.item.timing}
          </Text>
          <FontAwesome5
            name="coins"
            size={24}
            color="white"
            style={{ paddingHorizontal: 12 }}
          />
          <Text style={styles.substitutionItemText}>
            {substitution.item.hourlyPay}
          </Text>
        </View>
        <View style={styles.substitutionPreviewComponent}>
          <Ionicons
            name="person"
            size={24}
            color="white"
            style={{ paddingRight: 12 }}
          />
          <Text style={styles.substitutionItemText}>
            {substitution.item.title}
          </Text>
        </View>
        <View style={styles.substitutionPreviewComponent}>
          <Entypo
            name="location-pin"
            size={24}
            color="white"
            style={{ paddingRight: 12 }}
          />
          <Text style={styles.substitutionItemText}>
            {substitution.item.location}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  substitutionItemContainer: {
    width: '100%',
    marginTop: 4,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#5e0acc',
    borderColor: '#5e0acc',
  },
  pressedSubstitutionItem: {
    opacity: 0.5,
  },
  substitutionPreviewComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    padding: 10,
  },
  substitutionItemText: {
    color: 'white',
  },
})

export default SubstitutionItem
