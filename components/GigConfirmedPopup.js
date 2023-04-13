import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import { formatDate, formatHourlyPay } from '../utils'
import { colors } from '../assets/styles/colors'
import { Icon } from '@rneui/themed'

const GigConfirmedPopup = ({ route, navigation }) => {

  const { substitution, waitingForConfirmation} = route.params

  if (!waitingForConfirmation) {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={popupStyles.popupContainer}>
          <View style={[popupStyles.popupHeader, {backgroundColor: '#86CF4C'}]}>
            <View style={{flex: 1}}/>
            <View style={{flex: 8, alignItems: 'center'}}>
              <Text style={[styles.whiteText, { fontSize: 22, fontFamily: 'Figtree-ExtraBold' }]}>Paikka on sinun!</Text>
            </View>
            <View style={{flex: 1, marginRight: 7}}>
              <Pressable onPress={() => {navigation.pop()}}>
                <Icon name='close-circle-outline' type="material-community" color={colors.textLight}/>
              </Pressable>
            </View>
          </View>

          <View style={{ marginHorizontal: 15 }}>
            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontSize: 18 }]}>{substitution.title}</Text>
              <Text style={[styles.blackText, { fontWeight: 'bold', fontSize: 18 }]}>{substitution.department}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text>{formatDate(substitution.timing.startTime)}</Text>
                <Text style={{ fontWeight: 'bold', color: '#1D847E' }}>{formatHourlyPay(substitution.hourlyPay)} €/h (~placeholder)</Text>
              </View>
            </View>

            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontWeight: 'bold' }]}>Yhteystiedot:</Text>
              <Text>{substitution.organisation}</Text>
              <Text>{substitution.location}</Text>
            </View>

            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontWeight: 'bold' }]}>Yhteyshenkilö:</Text>
              <Text>{substitution.contactInfo.email}</Text>
              <Text>{substitution.contactInfo.phoneNumber}</Text>
            </View>

            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontWeight: 'bold' }]}>Ohjeet sijaiselle:</Text>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio orci, molestie nec maximus euismod, lobortis vel est.</Text>
            </View>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={popupStyles.popupContainer}>
          <View style={[popupStyles.popupHeader, {backgroundColor: '#13912A'}]}>
            <View style={{flex: 1}}/>
            <View style={{flex: 8, alignItems: 'center'}}>
              <Text style={[styles.whiteText, { fontSize: 22, fontFamily: 'Figtree-ExtraBold' }]}>Olet ehdolla sijaiseksi!</Text>
            </View>
            <View style={{flex: 1, marginRight: 7}}>
              <Pressable onPress={() => {navigation.pop()}}>
                <Icon name='close-circle-outline' type="material-community" color={colors.textLight}/>
              </Pressable>
            </View>
          </View>

          <View style={{ marginHorizontal: 15 }}>
            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontSize: 18 }]}>{substitution.title}</Text>
              <Text style={[styles.blackText, { fontWeight: 'bold', fontSize: 18 }]}>{substitution.department}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text>{formatDate(substitution.timing.startTime)}</Text>
                <Text style={{ fontWeight: 'bold', color: '#1D847E' }}>{formatHourlyPay(substitution.hourlyPay)} €/h (~{formatHourlyPay((substitution.timing.duration / 60) * substitution.hourlyPay)} €)</Text>
              </View>
            </View>

            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontWeight: 'bold' }]}>Kiitos mielenkiinnostasi!</Text>
              <Text>Työnantajan on ensin hyväksyttävä ilmoittautumisesi. Ilmoitamme sinulle, saitko paikan vai et.</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const popupStyles = StyleSheet.create({
  infoBlock: {
    marginTop: 20
  },
  popupContainer: {
    backgroundColor: '#FFF',
    paddingBottom: 50
  },
  popupHeader: {
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center'
  }
})

export default GigConfirmedPopup