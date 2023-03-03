import React, {useContext, useEffect, useState} from 'react'
import * as userData from '../assets/data/userData.json'
import { View, Text, Button } from 'react-native'
import { getUserData } from '../utils/getUserData'
import UserInfoView from './UserInfoView'
import {logUserData} from '../utils/logUserData'
import {LocaleContext} from '../contexts/LocaleContext'

function UserInfoScreen({navigation}) {
  delete userData['default']
  const { i18n, locale, setLocale } = useContext(LocaleContext)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setUser(user)
      setLoading(false)
    }

    fetchUserData()
  }, [])
  
  if(loading){
    return(
      <View>
        <Text>{i18n.t('loading')}</Text>
      </View>
    )
    
  }
  return(<UserInfoView user={user} setUser={setUser} navigation={navigation}/>)
}

export default UserInfoScreen