import { View, Pressable, Text } from 'react-native'
import { createContext } from 'react'
import { colors } from '../assets/styles/colors'

const NavigateToSavedSubstitutionsButton = ({navigation}) => {
  return (
    <View style={{
      backgroundColor: colors.info, 
      width: '90%', 
      alignSelf: 'center',
      padding: 10,
      borderRadius: 20
    }}>
      <Pressable onPress={() => {
        navigation.navigate('Haku', {showSavedOnly: true})
      }}>
        <Text style={{
          color: colors.textLight, 
          textAlign: 'center', 
          fontFamily: 'Inter-Display'}}
        >Näytä kaikki tallennetut vuorot
        </Text>
      </Pressable>
    </View>
  )

}

export default NavigateToSavedSubstitutionsButton