import { Text, View } from 'react-native'
import React from 'react'

import SubstitutionsList from '../components/SubstitutionsList'
import substitutions from '../assets/data/substitutionsData_new.json'

const TailoredSubsitutions = ({ navigation }) => {

  const tailoredSubstitutions = substitutions.filter((s) => s.location.includes('TURKU'))

  return (
    <View>
      <Text>Tässä listassa sijaisuudet Turussa</Text>
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
    </View>
  )
}

export default TailoredSubsitutions