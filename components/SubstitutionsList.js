import { View, FlatList } from 'react-native'

import SubstitutionItem from './SubstitutionItem'
import styles from '../assets/styles/styles'
import SubstitutionHeroItem from './SubstitutionHeroItem'
import { useEffect, useState } from 'react'
import { getUserData } from '../utils'
import { Text } from 'react-native'

const SubstitutionsList = ({ navigation, substitutions }) => {
  const [savedSubstitutions, setData] = useState(null)

  useEffect(() => {
    const retrieveData = async () => {
      const userData = await getUserData()

      //Filter accepted substitutions to unique ids
      const uniqueSubstitutions = userData.savedSubstitutions.filter(
        (value, index, array) => array.indexOf(value) === index
      )

      console.log(uniqueSubstitutions)

      //Filter all substitutions to ones that match the id
      setData(uniqueSubstitutions)
    }
    retrieveData()
  }, [])

  //If saved substitutions have been retrieved
  if (savedSubstitutions) {
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
                isBookmarked={savedSubstitutions.includes(substitution.item.id)}
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
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}

export default SubstitutionsList
