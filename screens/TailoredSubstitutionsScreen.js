import { Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import SubstitutionsList from '../components/SubstitutionsList'
import substitutions from '../assets/data/substitutionsData_new.json'

import { orderAndFilterSubstitutionsByPreferences } from '../utils/orderAndFilterSubstitutionsByPreferences'
import AsyncStorage from '@react-native-async-storage/async-storage'

let updatedAt = 1677509078236

async function preferencesHaveChanged(setShouldReload, shouldReload) {
  const UserUpdatedAt = await AsyncStorage.getItem('updatedAt')
  if(UserUpdatedAt > updatedAt){
    updatedAt = UserUpdatedAt
    setShouldReload(!shouldReload)
  }
  return false
}

const TailoredSubsitutions = ({ route, navigation, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled }) => {

  const [loading, setLoading] = useState(true)
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])
  const [shouldReload, setShouldReload] = useState(false)

  useEffect(() => {
    async function callOrderAndFilterSubstitutionsByPreferences() {
      const result = await orderAndFilterSubstitutionsByPreferences(substitutions)
      console.log(result.length)
      setTailoredSubstitutions(result)
      setLoading(false)
    }
    callOrderAndFilterSubstitutionsByPreferences()
  }, [shouldReload])

  const intervalID = setInterval(async () => {
    await preferencesHaveChanged(setShouldReload, shouldReload)
  }, 5000)

  if(loading){
    return(
      <View>
        <Text>Ladataan, hetki vain.</Text>
      </View>
    )
  }

  if(tabBarHidden && navigation.isFocused()){
    setTabBarHidden(false)
  }

  if(!swipeEnabled && navigation.isFocused()){
    setSwipeEnabled(true)
  }

  if(tailoredSubstitutions.length === 0){
    return(
      <View>
        <Button title='refresh' onPress={() => setShouldReload(!shouldReload)}/>
        <Text style={{ padding: 16, margin: 16 }}>Valitettavasti emme löytäneet mieltymyksiesi mukaisia työvuoroja.</Text>
        <Text>Voit käydä käyttäjäprofiilissasi muokkaamassa esimerkiksi vuorojen enimmäisetäisyyttä</Text>
      </View>
    )
  }

  return (
    <View>
      <Button title='refresh' onPress={() => setShouldReload(!shouldReload)}/>
      <Button title='clear' onPress={() => clearInterval(intervalID)}/>
      <Text style={{ paddingHorizontal: 16, marginVertical: 16 }}>Mieltyksiäsi vastaa {tailoredSubstitutions.length} työvuoroa</Text>
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
    </View>
  )
}

export default TailoredSubsitutions