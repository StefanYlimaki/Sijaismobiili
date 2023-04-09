import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import { formatDate, formatHourlyPay } from '../utils'

const GigConfirmedPopup = ({ substitution, waitingForConfirmation }) => {

  if (!waitingForConfirmation) {
    return (
      <View>
        <View style={[popupStyles.popupHeader, {backgroundColor: '#86CF4C'}]}>
          <Text style={[styles.whiteText, { fontSize: 22, fontFamily: 'Figtree-ExtraBold', alignSelf: 'center' }]}>Paikka on sinun!</Text>
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
    )
  } else {
    return (
      <View>
        <View style={[popupStyles.popupHeader, {backgroundColor: '#13912A'}]}>
          <Text style={[styles.whiteText, { fontSize: 22, fontFamily: 'Figtree-ExtraBold', alignSelf: 'center' }]}>Olet ehdolla sijaiseksi</Text>
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
        </View>
      </View>
    )
  }
}

const popupStyles = StyleSheet.create({
  infoBlock: {
    marginTop: 20
  },
  popupHeader: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'column',
    height: 50,
    justifyContent: 'center'
  }
})

export default GigConfirmedPopup