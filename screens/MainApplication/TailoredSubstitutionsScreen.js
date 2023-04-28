import {ActivityIndicator, Text, View} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'

import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {krBlue} from '../../assets/styles/colors'

let updatedAt = 0

const TailoredSubsitutions = ({ route, navigation }) => {

  const [loading, setLoading] = useState(true)
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])


  async function callOrderAndFilterSubstitutionsByPreferences() {
    const UserUpdatedAt = await AsyncStorage.getItem('updatedAt')
    if(UserUpdatedAt > updatedAt){
      const result = await orderAndFilterSubstitutionsByPreferences(substitutions)
      setTailoredSubstitutions(result)
      updatedAt = UserUpdatedAt
    }
    setLoading(false)
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      callOrderAndFilterSubstitutionsByPreferences()
    })

    return unsubscribe
  }, [navigation])
  
  if(loading){
    return(
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator size="large" color= {krBlue} />
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
      <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
    </View>
  )
}

export default TailoredSubsitutions