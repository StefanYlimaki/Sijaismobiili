import { View, FlatList, Text } from 'react-native'

import SubstitutionItem from './SubstitutionItem'
import styles from '../assets/styles/styles'
import { getUserData } from '../utils'
import { useEffect, useState } from 'react'


const AcceptedSubstitutionList = ({ navigation, substitutions, substitutionIds }) => {
  const [acceptedSubstitutions, setData] = useState(null)

  useEffect(() => {
    const retrieveData = async () => {
      const userData = await getUserData()

      //Filter accepted substitutions to unique ids
      const uniqueSubstitutions = userData.substitutions.filter(
        (value, index, array) => array.indexOf(value) === index
      )

      //Filter all substitutions to ones that match the id
      const userSubstitutions = []
      uniqueSubstitutions.forEach((id) =>  {
        const index = substitutions.findIndex((elem) => elem.id === id)
        if (index !== -1) {
          userSubstitutions.push(substitutions[index])
        }
      })

      setData(userSubstitutions)
    }
    retrieveData()
  }, [])

  return (
    acceptedSubstitutions? (
      <View style={styles.substitutionsListContainer}>
        <FlatList
          data={acceptedSubstitutions}
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
    ) : (<Text>{'Loading substitutions'}</Text>)
  )
}

export default AcceptedSubstitutionList
