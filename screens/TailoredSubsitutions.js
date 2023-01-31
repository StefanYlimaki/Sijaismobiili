import { Text, View } from 'react-native'
import React from 'react'

import SubstitutionsList from '../components/SubstitutionsList'
import substitutions from '../assets/data/substitutionsData.json'

const TailoredSubsitutions = ({ navigation }) => {

  const tailoredSubstitutions = substitutions.filter((s) => s.timing.includes('PE') && s.location.includes('TURKU') && s.hourlyPay.includes('19'))

  return (
    <View>
      <Text>Tässä listassa sijaisuudet, jotka ovat Perjantaina, Turussa ja tuntipalkka 19/h</Text>
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
    </View>
  )
}

export default TailoredSubsitutions