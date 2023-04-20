import { View, Text, Button, ScrollView } from 'react-native'
import styles from '../../assets/styles/styles'
import {colors} from '../../assets/styles/colors.js'
import { getUserData } from '../../utils/getUserData'
import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Slider } from '@rneui/themed'
import {Icon} from '@rneui/base'
import {ListItem} from '@rneui/base'
import postCode from '../../assets/data/postcode_map_light.json'

const PageThree = ({ navigation, handleChange }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

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
        <ActivityIndicator size="large" color= {colors.krBlue} />
      </View>
    )
  }

  return(
    <View>
      <Text>Kerro vielä kuka olet</Text>
      <Text>Tehdään toisemme vielä tarkemmin tutuiksi.</Text>
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
            <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Sähköpostiosoite</Text></ListItem.Title>
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
                onEndEditing={(e) => handleChange(e, 'postNumber')}
                textContentType={'postalCode'}
              />
            </ListItem>
            <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Postitoimipaikka</Text></ListItem.Title>
              <ListItem.Input
                disabled //From post number
                value = {postCode[user.postNumber]}
                //onEndEditing={(e) => handleChange(e, 'city')}

              />
            </ListItem>
            <ListItem containerStyle={styles.listItemContainer} bottomDivider><ListItem.Title><Text style={styles.textfieldlist}>Henkilötunnus</Text></ListItem.Title>
              <ListItem.Input
                editable
                defaultValue={user.personNumber}
                onEndEditing={(e) => handleChange(e, 'personNumber')}
              />
            </ListItem>
            <ListItem containerStyle={styles.listItemContainer}><ListItem.Title><Text style={styles.textfieldlist}>Valviran rekisteröintinumero</Text></ListItem.Title>
              <ListItem.Input
                editable
                defaultValue={user.valviraID}
                keyboardType={'numeric'}
                onEndEditing={(e) => handleChange(e, 'valviraID')}
              />
            </ListItem>
            <ListItem containerStyle={styles.listItemContainer}><ListItem.Title><Text style={styles.textfieldlist}>Notifikaatio Token</Text></ListItem.Title>
              <ListItem.Input
                defaultValue={user.token}
                keyboardType={'numeric'}
                onEndEditing={(e) => handleChange(e, 'valviraID')}
              />
            </ListItem>
          </View>
        </View>
      </ScrollView>
      <Button title='Jatka' onPress={() => navigation.navigate('MainApplication')}/>
    </View>
  )
}

export default PageThree