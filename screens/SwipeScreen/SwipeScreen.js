
import React from 'react'
import {View, Text, Button, Pressable} from 'react-native'
import RecommendationView from './RecommendationView'
import { colors } from './colors.js'
import {CommonActions} from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'


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
        backgroundColor: colors.krGreen, 
        marginBottom: 10, 
        alignContent: 'center',
        borderRadius: 150,
      }}> 
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flex: 1}}/>
          <View style={{flex:1, alignSelf: 'center'}}>
            <Text style={{textAlign: 'center', color: 'white', 
              fontFamily:'Inter-DisplayExtraBold', fontSize: 20, alignSelf:'center'
            }}>
          LOGO  
            </Text>
          </View>
          <Pressable style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}} 
            onPress={() => { navigation.navigate('UserInfoScreen') }}>
            <View style={{ height: 50, width: 50}}>
              <AntDesign name="user" size={24} color="black" />
            </View>
          </Pressable>
        </View>
        <Text style={{textAlign: 'center', color: 'white',
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
            backgroundColor: colors.krGreen,
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
            <Text style={{textAlign: 'center', color: colors.danger, fontFamily: 'Inter-Display'}}>
              En halua nähdä enää räätälöityjä suosituksia              
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default SwipeScreen