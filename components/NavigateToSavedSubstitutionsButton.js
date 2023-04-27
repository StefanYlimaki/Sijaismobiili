import { View, Pressable, Text } from 'react-native'
import { createContext } from 'react'

const NavigateToSavedSubstitutionsButton = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'red'}}>
      <Pressable onPress={() => {
        navigation.navigate('Haku', {showSavedOnly: true})
      }}>
        <Text>Näytä vain tallennetut sijaisuudet</Text>
      </Pressable>
    </View>
  )

}

export default NavigateToSavedSubstitutionsButton