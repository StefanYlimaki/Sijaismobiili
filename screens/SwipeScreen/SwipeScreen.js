
import React from 'react'
import {View, Text, Button, Pressable} from 'react-native'
import RecommendationView from './RecommendationView'
import { danger, krGreen } from '../../assets/styles/colors'
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
    <View style={{height:'100%'}}>
      <View style={{
        marginHorizontal: -20,
        marginVertical: -50,
        paddingVertical: 60,
        height: 170,
        backgroundColor: krGreen, 
        marginBottom: 10, 
        alignContent: 'center',
        borderRadius: 150,
        transform: [{scaleX: 1.2}]
      }}> 
        <Text style={{textAlign: 'center', transform: [{scaleX: 0.83}], color: 'white', 
          fontFamily:'Inter-DisplayExtraBold', fontSize: 20
        }}>
          LOGO  
        </Text>
        <Text style={{textAlign: 'center', transform: [{scaleX: 0.83}], color: 'white',
          fontFamily: 'Inter-Display', fontSize: 15
        }}>
          {'Tervetuloa takaisin!'}
        </Text>
      </View>
      <RecommendationView navigation={navigation}/>
      <View style={{
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 15
      }}>

        <Pressable
          onPress={() => skipScreen()}
        >
          <View style={{
            padding: 20,
            backgroundColor: krGreen,
            borderRadius: 50,
            marginBottom: 5
          }}
          >
            <Text style={{
              color: 'white',
              fontFamily: 'Inter-Display'
            }}>
            Selaan räätälöityjä suosituksia taas huomenna
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={()=> skipScreen()}>
          <View>
            <Text style={{textAlign: 'center', color: danger, fontFamily: 'Inter-Display'}}>
              En halua nähdä enää räätälöityjä suosituksia              
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default SwipeScreen