import { View, FlatList } from 'react-native'

import SubstitutionItem from './SubstitutionItem'
import styles from '../assets/styles/styles'

const SubstitutionsList = ({ navigation, substitutions }) => {

  return (
    <View style={styles.substitutionsListContainer}>
      <FlatList
        data={substitutions}
        renderItem={(substitution) => {
          return (
            <SubstitutionItem
              substitution={substitution}
              navigation={navigation}
            />
          )
        }}
        keyExtractor={(substitution, index) => {
          return substitution.id
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default SubstitutionsList
