import React, { useEffect, useState } from 'react'
import * as userData from '../../assets/data/userData.json'
import {View, ActivityIndicator} from 'react-native'
import { getUserData } from '../../utils'
import UserInfoView from './UserInfoView'
import {krBlue} from '../../assets/styles/colors'

function UserInfoScreen({navigation}) {
  delete userData['default']

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
  return(<UserInfoView user={user} setUser={setUser} navigation={navigation}/>)
}

export default UserInfoScreen