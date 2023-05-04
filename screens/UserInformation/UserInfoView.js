import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native'
import { logUserData } from '../../utils/logUserData'
import * as Colors from '../../assets/styles/colors.js'
import styles from '../../assets/styles/styles'
import { setUserData } from '../../utils/setUserData'
import { ListItem } from '@rneui/base'
import postCode from '../../assets/data/postcode_map_light.json'
import { getPostalAddressByPostCode } from '../../utils/getPostalAddressByPostCode'

const UserInfoView = ({ user, setUser, navigation }) => {
  const [postalAddress, setPostalAddress] = useState(getPostalAddressByPostCode(user.postNumber))
  const handleChange = async (event, key, subKey) => {
    try {
      const newUser = { ...user }
      if (subKey) {
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
    <KeyboardAvoidingView behavior='height' style={{ marginTop: 10 }}>
      <ScrollView>
        <View style={styles.userContent}>
          <View>
            <Text style={[styles.h2, styles.blackText, { textAlign: 'center' }]}>Henkilötiedot</Text>
          </View>
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
                value={postalAddress}

              />
            </ListItem>
            <ListItem containerStyle={styles.listItemContainer} ><ListItem.Title><Text style={styles.textfieldlist}>Henkilötunnus</Text></ListItem.Title>
              <ListItem.Input
                editable
                defaultValue={user.personNumber}
                onEndEditing={(e) => handleChange(e, 'personNumber')}
              />
            </ListItem>
          </View>
        </View>
      </ScrollView>
      <Pressable style={styles.settingsButton}
        accessibilityRole="button"
        accessibilityLabel="Asetukset"
        accessibilityHint='Johtaa asetuksiin'
        onPress={() => { navigation.navigate('Settings') }}>
        <Text style={styles.buttonText}>Asetukset</Text>
      </Pressable>
    </KeyboardAvoidingView>
  )
}

export default UserInfoView