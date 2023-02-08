
import React from 'react'
import {View, Text, Button} from 'react-native'

const SwipeScreen = ({ navigation }) => {
  return(
    <View>
      <Text>
          moi
      </Text>
      <Button onPress={() => navigation.navigate('MainApplication')} title='siirry sovellukseen'></Button>
    </View>
  )
}

export default SwipeScreen