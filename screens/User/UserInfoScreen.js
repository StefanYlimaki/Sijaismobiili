import React, { useEffect, useState } from 'react'
import * as userData from '../../assets/data/userData.json'
import { View, Text } from 'react-native'
import { getUserData } from '../../utils/getUserData'
import UserInfoView from './UserInfoView'

function UserInfoScreen() {
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
    return <View><Text>Ladataan, hetki vain.</Text></View>
  }
  return <UserInfoView user={user} setUser={setUser}/>
}

export default UserInfoScreen