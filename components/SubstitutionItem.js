import { View, Text, StyleSheet, Pressable } from 'react-native'
import styles from '../assets/styles/styles'

const SubstitutionItem = ({ substitution, navigation }) => {

  const getDay = () => {
    return('31.1')
  }

  const getTime = () => {
    return('11.00-16.00')
  }

  const getDistance = () => {
    return('2km')
  }

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
          <View style={styles.substitutionPreviewComponentTopElement}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.whiteText}>
                {getDay(substitution.item.date)}
              </Text>
              <Text style={styles.whiteText}>
                {substitution.item.organisation}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.whiteText}>
                {getTime(substitution.item.date)}
              </Text>
              <Text style={styles.whiteText}>
                {getDistance(substitution.item.location)}
              </Text>
            </View>
          </View>
          <View style={styles.substitutionPreviewComponentBottomElement}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ flexDirection: 'column'}}>
                <Text style={{ fontSize: 20}}>
                  {substitution.item.title}
                </Text>
                <Text>
                  {substitution.item.department}
                </Text>
              </View>
              <View style={{ flexDirection: 'column'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={ [styles.blackText, { paddingRight: 8, fontWeight: 'bold'}]}>
                    {substitution.item.hourlyPay}€/h
                  </Text>
                  <Text style={ [styles.blackText, { paddingRight: 16 }]}>
                    (60,75€)
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
                
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default SubstitutionItem
