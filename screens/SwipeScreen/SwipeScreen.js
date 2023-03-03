
import React from 'react'
import {View, Text, Button, Pressable} from 'react-native'
import RecommendationView from './RecommendationView'
import { krGreen } from '../../assets/styles/colors'


const SwipeScreen = ({ navigation }) => {
  return(
    <View>
      <RecommendationView/>
      <Pressable
        onPress={() => navigation.navigate('MainApplication')}
      >
        <View style={{
          padding: 20,
          backgroundColor: krGreen,
          borderRadius: 20
        }}
        >
          <Text style={{
            color: 'white'
          }}>
            Selaan räätälöityjä suosituksia taas huomenna
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default SwipeScreen