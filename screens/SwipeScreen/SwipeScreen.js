
import React, { useState, useEffect } from 'react'
import {View, Text, Button, Pressable, ActivityIndicator} from 'react-native'
import RecommendationView from './RecommendationView'

import { colors } from '../../assets/styles/colors'
import {CommonActions} from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import substitutions from '../../assets/data/substitutionsData_new.json'
import {krBlue} from '../../assets/styles/colors'

//Count of cards shown to the user
const CARD_COUNT = 5

const SwipeScreen = ({ navigation }) => {
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function callOrderAndFilterSubstitutionsByPreferences() {
      const result = await orderAndFilterSubstitutionsByPreferences(substitutions)
      let amountOfSubstitutions
  
      // If there are no applicable substitutions ==> navigate to mainapplication.
      if(result.length === 0){
        skipScreen()
      }
  
      // If there are more than five applicable substitutions ==> limit card count to CARD_COUNT
      if(result.length > 5){
        amountOfSubstitutions = CARD_COUNT
      }
  
      // Get the substitutions to show in recommendation view.
      setTailoredSubstitutions(result.slice(0, amountOfSubstitutions))

      // If there are at least 1 substitution to be shown ==> set loading to false.
      // In a case, where there are no substitutions, user is redirected to main application (code above)
      if(result.length !== 0){
        setLoading(false)
      }
    }
    
    callOrderAndFilterSubstitutionsByPreferences()
  }, [])
    
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

  return(
    <View style={{height:'100%'}}>
      <View style={{
        marginHorizontal: '-5%',
        marginVertical: '-15%',
        paddingVertical: 60,
        height: '23%',
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
      <RecommendationView navigation={navigation} substitutions={tailoredSubstitutions}/>
      <View style={{
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom: 15
      }}>
        <Pressable onPress={() => skipScreen()}>
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