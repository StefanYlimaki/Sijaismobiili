import React from 'react'
import * as userData from '../assets/data/userData.json'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import Slider from '@react-native-community/slider'
import * as Colors from '../assets/styles/colors.js'
import styles from '../assets/styles/styles'

function UserInfoScreen()  {

  return(

    <KeyboardAvoidingView
      style={styles.userContainer}
      //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback>
        <ScrollView style={[styles.userContent, styles.blackText]}>
          <View>
            <Text>
              <Text style={styles.h1}>Moi</Text>
              <Text style={ [styles.h1, {color: Colors.krBlue, fontFamily: 'Inter-DisplayExtraBold'}]}> {userData.firstname}!</Text>
            </Text>
            <Text>Mitä työtä mielesi tekevi?</Text>
          </View>
          <View style={styles.sliderList}>
            <Text style={styles.h2}>
            Mieltymykset
            </Text>
            <View style={styles.tag}>
              <Text style={styles.label}>
                Aamuvuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              minimumTrackTintColor={Colors.krGreen}
              maximumTrackTintColor={Colors.krGreen}
              step={1}
              value={userData.preferences.morning}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Iltavuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={userData.preferences.evening}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Yövuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={userData.preferences.night}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Palkka
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={userData.preferences.pay}
            />
            <View style={styles.tag}>
              <Text style={styles.label}>
                Täydet vuorot
              </Text>
            </View>
            <Slider
              style={styles.prefSlider}
              maximumValue={5}
              minimumValue={1}
              step={1}
              value={userData.preferences.fullShift}
            />
          </View>
        
          <View>
            <Text style={styles.h2}>
              Henkilötiedot
            </Text>
            <Text style={styles.textfieldlist}>Etunimi</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.firstname}
            />
            <Text style={styles.textfieldlist}>Sukunimi</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.lastname}
            />
            <Text style={styles.textfieldlist}>Sähköpostiosoite</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.email}
              keyboardType="email-address"
            />
            <Text style={styles.textfieldlist}>Puhelinnumero</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.phoneNumber}
              keyboardType="phone-pad"
            />
            <Text style={styles.textfieldlist}>Katuosoite</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.adress}
            />
            <Text style={styles.textfieldlist}>Postinumero</Text>
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.postNumber}
              keyboardType="numeric"
            />
            <Text style={styles.textfieldlist}>Kunta</Text>
            <TextInput 
              editable
              style={styles.input}
              default={userData.city}
            />
            <Text style={styles.textfieldlist}>{userData.personNumber}</Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default UserInfoScreen