import { Text, View } from 'react-native'
import React from 'react'

import SubstitutionsList from '../components/SubstitutionsList'
import substitutions from '../assets/data/substitutionsData_new.json'

const AllSubstitutions = ({ navigation }) => {
  return (
    <View>
      <Text>Tässä listassa ovat kaikki sijaisuudet.</Text>
      <SubstitutionsList navigation={navigation} substitutions={substitutions}/>
    </View>
  )
}

export default AllSubstitutions