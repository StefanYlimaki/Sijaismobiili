import React from 'react'
import {StyleSheet, View, Text, Pressable, ScrollView, ImageBackground, Image} from 'react-native'
import styles from '../assets/styles/styles'
import { formatDate, formatHourlyPay } from '../utils'
import { colors } from '../assets/styles/colors'
import { Icon } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'

const placeholder = {uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'}

const GigConfirmedPopup = ({ route, navigation }) => {
  const { substitution, waitingForConfirmation} = route.params

  const image = () => {
    if (substitution.image) {
      return {uri: substitution.image}
    } else {
      return placeholder
    }
  }

  if (!waitingForConfirmation) {
    return (
      <View style={popupStyles.popupContainer}>
        <LinearGradient
          colors={['#13912A', '#86CF4C']}>
          <View style={popupStyles.popupHeader}>
            <View style={{flex: 1}}/>
            <View style={{flex: 8, alignItems: 'center'}}>
              <Text style={[styles.whiteText, { fontSize: 22 }]}>Paikka on sinun!</Text>
            </View>
            <View style={{flex: 1, marginRight: 7}}>
              <Pressable onPress={() => {navigation.pop()}}>
                <Icon name='close-circle-outline' type="material-community" color={colors.textLight}/>
              </Pressable>
            </View>
          </View>
        </LinearGradient>

        <ImageBackground
          source={image()}
          imageStyle={popupStyles.headerImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.5)']}
            start={{ x: 0, y: 0.0}}
            end={{x: 0.0, y: 0.5}}>
            <View style={popupStyles.imageContent}>
              <Text style={[styles.blackText, { fontSize: 22 }]}>{substitution.title}</Text>
              <Text style={[styles.blackText, { fontWeight: 'bold', fontSize: 22 }]}>{substitution.department}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <LinearGradient
          colors={['#13912A', '#86CF4C']}
          start={{ x: 0, y: 1.0}}
          end={{x: 0.0, y: 0.0}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 15 }}>
            <Text style={styles.whiteText}>{formatDate(substitution.timing.startTime)}</Text>
            <Text style={[styles.whiteText, { fontWeight: 'bold' }]}>{formatHourlyPay(substitution.hourlyPay)} €/h (~{formatHourlyPay((substitution.timing.duration / 60) * substitution.hourlyPay)})</Text>
          </View>
        </LinearGradient>
        
        <ScrollView>
          <View style={{ marginHorizontal: 15 }}>
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
        </ScrollView>

        <View style={popupStyles.footer}>
          <Text style={styles.h2}>Tervetuloa töihin!</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={popupStyles.popupContainer}>
        <LinearGradient
          colors={['#008F54', '#006B96']}>
          <View style={popupStyles.popupHeader}>
            <View style={{flex: 1}}/>
            <View style={{flex: 8, alignItems: 'center'}}>
              <Text style={[styles.whiteText, { fontSize: 22 }]}>Olet ehdolla sijaiseksi!</Text>
            </View>
            <View style={{flex: 1, marginRight: 7}}>
              <Pressable onPress={() => {navigation.pop()}}>
                <Icon name='close-circle-outline' type="material-community" color={colors.textLight}/>
              </Pressable>
            </View>
          </View>
        </LinearGradient>

        <ImageBackground
          source={image()}
          imageStyle={popupStyles.headerImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.5)']}
            start={{ x: 0, y: 0.0}}
            end={{x: 0.0, y: 0.5}}>
            <View style={popupStyles.imageContent}>
              <Text style={[styles.blackText, { fontSize: 22 }]}>{substitution.title}</Text>
              <Text style={[styles.blackText, { fontWeight: 'bold', fontSize: 22 }]}>{substitution.department}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>

        <LinearGradient
          colors={['#006B96', '#13912A']}
          start={{ x: 0, y: 0.0}}
          end={{x: 0.0, y: 1.0}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, marginHorizontal: 15 }}>
            <Text style={styles.whiteText}>{formatDate(substitution.timing.startTime)}</Text>
            <Text style={[styles.whiteText, { fontWeight: 'bold' }]}>{formatHourlyPay(substitution.hourlyPay)} €/h (~{formatHourlyPay((substitution.timing.duration / 60) * substitution.hourlyPay)})</Text>
          </View>
        </LinearGradient>
        
        <ScrollView>
          <View style={{ marginHorizontal: 15 }}>
            <View style={popupStyles.infoBlock}>
              <Text style={[styles.blackText, { fontWeight: 'bold' }]}>Kiitos mielenkiinnostasi! Työnantajan on ensin hyväksyttävä ilmottautumisesi. Ilmoitamme sinulle, saitko paikan vai et.</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const popupStyles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerImage: {
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  imageContent: {
    marginBottom: 20,
    marginHorizontal: 15,
    marginTop: 150
  },
  infoBlock: {
    marginTop: 20
  },
  popupContainer: {
    flex: 1,
    paddingBottom: 50
  },
  popupHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  }
})

export default GigConfirmedPopup