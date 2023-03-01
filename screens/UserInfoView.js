import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Pressable,
} from 'react-native'
import {logUserData} from '../utils/logUserData'
import * as Colors from '../assets/styles/colors.js'
import styles from '../assets/styles/styles'
import { setUserData } from '../utils/setUserData'
import {ListItem} from '@rneui/base'

const UserInfoView = ({ user, setUser, navigation }) => {
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

  return (
    <KeyboardAvoidingView style={styles.userContainer}>
      <TouchableWithoutFeedback>
        <ScrollView>
          <View>
            <Text style={styles.h1}>
              <Text>Moi,</Text>
              <Text style={[{ color: Colors.krBlue, fontFamily: 'Inter-DisplayExtraBold' }]}> {user.firstname}!</Text>
            </Text>
          </View>
          <View>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Etunimi</Text></ListItem.Title>
            <TouchableWithoutFeedback>
              <ListItem.Input
                placeholder={user.firstname}
                onEndEditing={(e) => handleChange(e, 'firstname')}
              />
            </TouchableWithoutFeedback>
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Sukunimi</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.lastname}
                onEndEditing={(e) => handleChange(e, 'lastname')}
              /></ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Sähköpostiosoite</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.email}
                keyboardType="email-address"
                onEndEditing={(e) => handleChange(e, 'email')}
              />
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Puhelinnumero</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.phoneNumber}
                keyboardType="phone-pad"
                onEndEditing={(e) => handleChange(e, 'phoneNumber')}
              />
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Katuosoite</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.address}
                onEndEditing={(e) => handleChange(e, 'address')}
              />
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Postinumero</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.postNumber}
                keyboardType="numeric"
                onEndEditing={(e) => handleChange(e, 'postNumber')}
              />
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Kunta</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.city}
                onEndEditing={(e) => handleChange(e, 'city')}
              />
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Henkilötunnus</Text></ListItem.Title>
              <ListItem.Input     
                placeholder={user.personNumber}
                onEndEditing={(e) => handleChange(e, 'personNumber')}
              />
            </ListItem>
            <ListItem bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Valviran rekisteröintinumero</Text></ListItem.Title>
              <ListItem.Input
                placeholder={user.valviraID}
                keyboardType="numeric"
                onEndEditing={(e) => handleChange(e, 'valviraID')}
              />
            </ListItem>
          </View>
          <Button title='log user' onPress={() => logUserData()} />
          <Text style={styles.textfieldlist}></Text>

          <Pressable style={styles.settingsButton} onPress={() => {navigation.navigate('Settings')}}>
            <Text style={styles.buttonText}>Asetukset</Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

const thumbTheme = (y) => {
  if (y === 1) {
    return Colors.danger
  }
  if (y === 2) {
    return Colors.warning
  }
  if (y === 3) {
    return Colors.krGreen
  }
  if (y === 4) {
    return Colors.info
  }
  if (y === 5) {
    return Colors.success
  }
}
const thumbIcon = (y) => {
  if (y === 1) {
    return 'heart-off'
  }
  if (y === 2) {
    return 'emoticon-neutral'
  }
  if (y === 3) {
    return 'emoticon-happy'
  }
  if (y === 4) {
    return 'emoticon'
  }
  if (y === 5) {
    return 'heart-multiple'
  }
}

export default UserInfoView