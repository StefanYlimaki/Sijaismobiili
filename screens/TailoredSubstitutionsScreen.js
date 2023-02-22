import { Text, View } from 'react-native'
import React from 'react'

import SubstitutionsList from '../components/SubstitutionsList'
import substitutions from '../assets/data/substitutionsData_new.json'

const TailoredSubsitutions = ({ navigation, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled }) => {

  const tailoredSubstitutions = substitutions.filter((s) => s.location.includes('TURKU'))

  if(tabBarHidden && navigation.isFocused()){
    setTabBarHidden(false)
  }

  if(!swipeEnabled && navigation.isFocused()){
    setSwipeEnabled(true)
  }

  return (
    <View>
      <Text>Tässä listassa sijaisuudet Turussa</Text>
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
    </View>
  )
}

export default TailoredSubsitutions