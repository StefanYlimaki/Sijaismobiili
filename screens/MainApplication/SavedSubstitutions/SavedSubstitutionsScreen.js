import React from 'react'
import { Text, View } from 'react-native'

import SubstitutionsList from '../../../components/SubstitutionsList'
import substitutions from '../../../assets/data/substitutionsData_new.json'

const SavedSubstitutions = ({ navigation, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled }) => {

  if(tabBarHidden && navigation.isFocused()){
    setTabBarHidden(false)
  }

  if(!swipeEnabled && navigation.isFocused()){
    setSwipeEnabled(true)
  }

  const saved = substitutions.filter((s) => (s.id % 12) === 0)

  return (
    <View>
      <Text>Tässä listassa on joka 12. sijaisuus</Text>
      <SubstitutionsList navigation={navigation} substitutions={saved}/>
    </View>
  ) 
}

export default SavedSubstitutions