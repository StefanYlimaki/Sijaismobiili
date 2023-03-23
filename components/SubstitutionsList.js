import { View, FlatList } from 'react-native'

import SubstitutionItem from './SubstitutionItem'
import styles from '../assets/styles/styles'
import SubstitutionHeroItem from './SubstitutionHeroItem'

const SubstitutionsList = ({ navigation, substitutions }) => {

  return (
    <View style={styles.substitutionsListContainer}>
      <FlatList
        data={substitutions}
        renderItem={(substitution) => {
          if (substitution.index === 0) {
            return (
              <SubstitutionHeroItem
                substitution={substitution}
                navigation={navigation}
              />
            )
          }
           else return (
            <SubstitutionItem
              substitution={substitution}
              navigation={navigation}
            />
          )
        }}
        keyExtractor={(substitution) => {
          return substitution.id
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default SubstitutionsList
