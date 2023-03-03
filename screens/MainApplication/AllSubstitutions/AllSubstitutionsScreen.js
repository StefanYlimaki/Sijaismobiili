import { Text, View, Button } from 'react-native'
import React, { useRef, useState } from 'react'

import SubstitutionsList from '../../../components/SubstitutionsList'
import substitutions from '../../../assets/data/substitutionsData_new.json'
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import FilterModal from './FilterModal'

const AllSubstitutions = ({ navigation, tabBarHidden, setTabBarHidden, swipeEnabled, setSwipeEnabled }) => {

  const [substList, setSubstList] = useState(substitutions)

  const BottomSheetModalRef = useRef(null)

  const snapPoints = ['58%']

  if(tabBarHidden && navigation.isFocused()){
    setTabBarHidden(false)
  }

  if(!swipeEnabled && navigation.isFocused()){
    setSwipeEnabled(true)
  }

  return (
    <BottomSheetModalProvider>
      <View>
        <Text>Tässä listassa ovat kaikki sijaisuudet.</Text>
        <Button 
          title="Filtteröi tuloksia"
          onPress={() => BottomSheetModalRef.current?.present() }
        />
        <SubstitutionsList navigation={navigation} substitutions={substList}/>
        <BottomSheetModal ref={BottomSheetModalRef} index={0} snapPoints={snapPoints}>
          <FilterModal setSubstList={setSubstList} substitutions={substitutions}/>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default AllSubstitutions