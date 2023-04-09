import {ActivityIndicator, Text, View, Button} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@rneui/themed'
import * as Colors from '../../assets/styles/colors'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'

import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {krBlue} from '../../assets/styles/colors'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import GigConfirmedPopup from '../../components/GigConfirmedPopup'

let updatedAt = 0

const TailoredSubsitutions = ({ route, navigation }) => {

  const [loading, setLoading] = useState(true)
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])

  // BOTTOM SHEET

  const BottomSheetModalRef = useRef(null)
  const snapPoints = ['58%']

  // BOTTOM SHEET END

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
    <BottomSheetModalProvider>
      <View>
        <View>
          <Button onPress={() => BottomSheetModalRef.current?.present()} title='Nappi'/>
          <SubstitutionsList navigation={navigation} substitutions={tailoredSubstitutions}/>
        </View>
        <BottomSheetModal ref={BottomSheetModalRef} index={0} snapPoints={snapPoints}>
          <GigConfirmedPopup substitution={substitutions[0]} waitingForConfirmation={true}/>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default TailoredSubsitutions