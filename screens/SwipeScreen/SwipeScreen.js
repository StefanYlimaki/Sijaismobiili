
import React from 'react'
import {View, Text, Button, Pressable} from 'react-native'
import RecommendationView from './RecommendationView'
import { colors } from '../../assets/styles/colors'
import {CommonActions} from '@react-navigation/native'


const SwipeScreen = ({ navigation }) => {
    
  function navito() {
    navigation.navigate('MainApplication')
  }
    
  function dispatcher() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'MainApplication' },
        ],
      })
    )
  }

  function skipScreen() {
    navito()
    dispatcher()
  }
    
  return(
    <View>
      <RecommendationView navigation={navigation}/>
      <Pressable
        onPress={() => skipScreen()}
      >
        <View style={{
          padding: 20,
          backgroundColor: colors.krGreen,
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