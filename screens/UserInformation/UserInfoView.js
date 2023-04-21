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
import {logUserData} from '../../utils/logUserData'
import * as Colors from '../../assets/styles/colors.js'
import styles from '../../assets/styles/styles'
import { setUserData } from '../../utils/setUserData'
import {ListItem} from '@rneui/base'
import postCode from '../../assets/data/postcode_map_light.json'
import { getPostalAddressByPostCode } from '../../utils/getPostalAddressByPostCode'

const UserInfoView = ({ user, setUser, navigation }) => {
  const [postalAddress, setPostalAddress] = useState(getPostalAddressByPostCode(user.postNumber))
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
          <View style={styles.userContent}>
            <Text style={{display: 'none'}}>
              <Text style={[styles.h2, styles.blackText]}>Moi! Tämä on täydellisen turha ostsikko, mutta ajakoot nyt placeholderin paikkaa!</Text>
            </Text>
            <View style={styles.userInfoList}
              importantForAutofill={'yes'} >
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Etunimi</Text></ListItem.Title>
                <ListItem.Input
                  autoCompleteType={'name-given'}
                  editable
                  defaultValue={user.firstname}
                  onEndEditing={(e) => handleChange(e, 'firstname')}
                  textContentType={'givenName'}
                /></ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Sukunimi</Text></ListItem.Title>
                <ListItem.Input
                  autoCompleteType={'family-name'}
                  editable
                  defaultValue={user.lastname}
                  onEndEditing={(e) => handleChange(e, 'lastname')}
                  textContentType={'familyName'}
                /></ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Sähköposti</Text></ListItem.Title>
                <ListItem.Input
                  autoComplete={'email'}
                  editable
                  defaultValue={user.email}
                  keyboardType={'email-address'}
                  onEndEditing={(e) => handleChange(e, 'email')}
                  textContentType={'emailAddress'}
                />
              </ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Puhelinnumero</Text></ListItem.Title>
                <ListItem.Input
                  autoComplete={'tel'}
                  editable
                  defaultValue={user.phoneNumber}
                  keyboardType={'phone-pad'}
                  onEndEditing={(e) => handleChange(e, 'phoneNumber')}
                  textContentType={'telephoneNumber'}
                />
              </ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Katuosoite</Text></ListItem.Title>
                <ListItem.Input
                  autoComplete={'street-address'}
                  editable
                  defaultValue={user.address}
                  onEndEditing={(e) => handleChange(e, 'address')}
                  textContentType={'streetAddressLine1'}
                />
              </ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Postinumero</Text></ListItem.Title>
                <ListItem.Input
                  autoComplete={'postal-code'}
                  editable
                  defaultValue={user.postNumber}
                  keyboardType="numeric"
                  onChangeText={(e) => {
                    setPostalAddress(getPostalAddressByPostCode(e))
                  }}
                  onEndEditing={(e) => {
                    handleChange(e, 'postNumber')
                  }}
                  textContentType={'postalCode'}
                />
              </ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Postitoimipaikka</Text></ListItem.Title>
                <ListItem.Input
                  disabled 
                  value = { postalAddress }
                />
              </ListItem>
              <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Henkilötunnus</Text></ListItem.Title>
                <ListItem.Input
                  editable
                  defaultValue={user.personNumber}
                  onEndEditing={(e) => handleChange(e, 'personNumber')}
                />
              </ListItem>
              <ListItem containerStyle={styles.listItemContainer}><ListItem.Title><Text style={styles.textfieldlist}>Rekisteröintinumero</Text></ListItem.Title>
                <ListItem.Input
                  disabled
                  defaultValue='41526262621'
                />
              </ListItem>
            </View>
            <Text style={styles.textfieldlist}></Text>
            <Pressable style={styles.settingsButton} onPress={() => {navigation.navigate('Settings')}}>
              <Text style={styles.buttonText}>Asetukset</Text>
            </Pressable>
          </View>
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