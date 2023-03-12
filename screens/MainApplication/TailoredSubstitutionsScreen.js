import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'

import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import AsyncStorage from '@react-native-async-storage/async-storage'

let updatedAt = 0

const TailoredSubsitutions = ({ route, navigation }) => {

  const [loading, setLoading] = useState(true)
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])

  async function callOrderAndFilterSubstitutionsByPreferences() {
    const UserUpdatedAt = await AsyncStorage.getItem('updatedAt')
    if(UserUpdatedAt > updatedAt){
      const result = await orderAndFilterSubstitutionsByPreferences(substitutions)
      console.log(result.length)
      setTailoredSubstitutions(result)
      updatedAt = UserUpdatedAt
    }
    setLoading(false)
  }
  
  useEffect(() => {
    setInterval(async () => {
      await callOrderAndFilterSubstitutionsByPreferences()
    }, 1000)
  }, [])
  
  if(loading){
    return(
      <View>
        <Text>Ladataan, hetki vain.</Text>
      </View>
    )
  }

  if(tailoredSubstitutions.length === 0){
    return(
      <View>
        <Text style={{ padding: 16, margin: 16 }}>Valitettavasti emme löytäneet mieltymyksiesi mukaisia työvuoroja.</Text>
        <Text style={{ padding: 16, margin: 16 }}>Voit käydä käyttäjäprofiilissasi muokkaamassa esimerkiksi vuorojen enimmäisetäisyyttä</Text>
      </View>
    )
  }

  return (
    <View>
      <Text style={{ paddingHorizontal: 16, marginVertical: 16 }}>Mieltyksiäsi vastaa {tailoredSubstitutions.length} työvuoroa</Text>
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
    </View>
  )
}

export default TailoredSubsitutions