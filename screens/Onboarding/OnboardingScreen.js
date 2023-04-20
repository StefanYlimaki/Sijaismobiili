import { useState, useEffect } from 'react'
import { Pressable, Button, Text, View, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Slider } from '@rneui/themed'
import {Icon} from '@rneui/base'
import SubstitutionItem from '../../components/SubstitutionItem'
import styles from '../../assets/styles/styles'
import {colors} from '../../assets/styles/colors.js'
import substitutions from '../../assets/data/substitutionsData_new.json'
import { getUserData } from '../../utils'
import { setUserData } from '../../utils/setUserData'

import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

const OnboardingScreen = ({ navigation }) => {
  const [pageToRender, setPageToRender] = useState(1)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setUser(user)
      setLoading(false)
    }

    fetchUserData()
  },[])

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
    <TouchableWithoutFeedback>
      {pageToRender === 1 
        ? 
        <PageOne setPageToRender={setPageToRender} handleChange={handleChange}/> 
        : <>
          {pageToRender === 2
            ? <PageTwo setPageToRender={setPageToRender} handleChange={handleChange}/>
            : <PageThree navigation={navigation} handleChange={handleChange}/>
          }
        </>
      }
    </TouchableWithoutFeedback>
  )
}

export default OnboardingScreen

