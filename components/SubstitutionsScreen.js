import { Button, Text, View, StyleSheet } from 'react-native'

import SubstitutionsList from './SubstitutionsList'

import substitutions from '../assets/data/substitutionsData.json'

const SubstitutionsScreen = ({ navigation }) => {
  return (
    <View style={styles.substitutionsContainer}>
      <SubstitutionsList navigation={navigation} substitutions={substitutions}/>
    </View>
  )
}

const styles = StyleSheet.create({
  substitutionsContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
})

export default SubstitutionsScreen
