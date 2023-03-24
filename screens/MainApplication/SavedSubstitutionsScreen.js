import React from 'react'
import { View } from 'react-native'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import AcceptedSubstitutionList from '../../components/AcceptedSubsitutionList'

const SavedSubstitutions = ({ navigation }) => {

  return (
    <View>
      <AcceptedSubstitutionList navigation={navigation} substitutions={substitutions}/>
    </View>
  ) 
}

export default SavedSubstitutions