import { Text, View, Button } from 'react-native'
import React, { useRef, useState } from 'react'

import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import FilterModal from '../FilterModal'

const AllSubstitutions = ({ navigation }) => {

  const [substList, setSubstList] = useState(substitutions)

  const BottomSheetModalRef = useRef(null)

  const snapPoints = ['58%']

  return (
    <BottomSheetModalProvider>
      <View>
        <Button 
          title="Filtteröi tuloksia"
          onPress={() => BottomSheetModalRef.current?.present() }
        />
        <View style={{ height: '95%' }}>
          <SubstitutionsList navigation={navigation} substitutions={substList}/>
        </View>
        <BottomSheetModal ref={BottomSheetModalRef} index={0} snapPoints={snapPoints}>
          <FilterModal setSubstList={setSubstList} substitutions={substitutions}/>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

export default AllSubstitutions