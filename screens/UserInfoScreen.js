import React, {useState} from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as userData from '../assets/data/userData.json'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import Slider from '@react-native-community/slider'
import * as Colors from '../assets/styles/colors.js'
import styles from '../assets/styles/styles'

const SavedStack = createNativeStackNavigator()

function UserInfoScreen()  {

  return(

    <KeyboardAvoidingView
      style={styles.userContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.userContent}>
          <View>
            <Text>
              <Text style={styles.h1}>Heippa vain</Text>
              <Text style={ [styles.h1, {color: Colors.krGreen, fontFamily: 'Inter-DisplayExtraBold'}]}> {userData.firstname}!</Text>
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
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.firstname}
            />
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.lastname}
            />
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.email}
              keyboardType="email-address"
            />
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.phoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.adress}
              keyboardType="phone-pad"
            />
            <TextInput
              editable
              style={styles.input}
              placeholder={userData.postNumber}
              keyboardType="numeric"
            />
            <TextInput 
              editable
              style={styles.input}
              placeholder={userData.city}
              keyboardType="phone-pad"
            />
            <Text>{userData.personNumber}</Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  )
}

export default UserInfoScreen