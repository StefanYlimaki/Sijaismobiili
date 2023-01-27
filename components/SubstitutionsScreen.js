import { Button, Text, View, StyleSheet } from 'react-native'

import SubstitutionsList from './SubstitutionsList'

const SubstitutionsScreen = ({ navigation, substitutions }) => {
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
