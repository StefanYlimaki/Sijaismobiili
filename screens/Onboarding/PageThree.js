
import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { ListItem } from '@rneui/base'

import { getUserData } from '../../utils/getUserData'
import { colors } from '../../assets/styles/colors.js'
import styles from '../../assets/styles/styles'
import { getPostalAddressByPostCode } from '../../utils/getPostalAddressByPostCode'

const PageThree = ({ navigation, handleChange }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [postalAddress, setPostalAddress] = useState('')

  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserData()
      setUser(user)
      setPostalAddress(getPostalAddressByPostCode(user.postNumber))
      setLoading(false)
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator size="large" color={colors.krBlue} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior='height'>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 36, paddingBottom: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: '900' }}>Kerro vielä kuka olet</Text>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Tehdään toisemme vielä tarkemmin tutuiksi.</Text>
      </View>
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={styles.userContent}>
          <Text style={{ display: 'none' }}>
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
      <View style={{ paddingTop: 68, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={{
          height: 80,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          elevation: 2,
          backgroundColor: colors.krBlue
        }}
        accessibilityRole='button'
        accessibilityLabel="Jatka"
        accessibilityHint='Tallentaa tietosi ja siirtyy listaukseen keikoista'
        onPress={() => navigation.navigate('MainApplication')}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600' }}>Jatka</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default PageThree