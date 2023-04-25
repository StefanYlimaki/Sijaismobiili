import { useState, useEffect } from 'react'
import { View, TouchableWithoutFeedback, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {colors} from '../../assets/styles/colors.js'
import { getUserData } from '../../utils'
import { setUserData } from '../../utils/setUserData'
import { StepNavigation, StepView } from 'react-native-step-view-navigation'

import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  
  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setUser(user)
    }

    fetchUserData()
    setLoading(false)

  }, [])

  const handleChange = async (event, key, subKey) => {
    try {
      const newUser = {...user}
      if(subKey){
        delete newUser[key][subKey]
        newUser[key][subKey] = event
      } else {
        const value = event.nativeEvent.text
        delete newUser[key]
        newUser[key] = value
      }
      setUserData(newUser)
      setUser(newUser)
    } catch (error) {
      console.log(error)
    }
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
        <ActivityIndicator size="large" color= {colors.krBlue} />
      </View>
    )
  }

  return(
    <StepNavigation
      dots={false}
      transitionDuration={1000}
      step={step}
    >
      <StepView>
        <PageOne handleChange={handleChange} setStep={setStep}/>
      </StepView>
      <StepView>
        <PageTwo handleChange={handleChange} setStep={setStep}/>
      </StepView>
      <StepView>
        <PageThree handleChange={handleChange} navigation={navigation}/>
      </StepView>
    </StepNavigation>
  )
}

export default OnboardingScreen

