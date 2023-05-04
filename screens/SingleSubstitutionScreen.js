import {Image, ImageBackground, Pressable, Text, View} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { formatHourlyPay, formatDate, formatTime } from '../utils/'
import styles from '../assets/styles/styles'
import DenyBookmarkAndAcceptButton from '../components/DenyBookmarkAndAcceptButtons'
import acceptSubstitution from '../utils/acceptSubstitution'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient'
const logo = { uri: 'https://www.sttinfo.fi/data/images/00063/de7b594d-309c-4622-8e66-b8d8b84dafd3-w_300_h_100.png' }

const placeholder = { uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' }
const test = { uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' }




const SingleSubstitutionScreen = ({ route, navigation }) => {
  const { substitution } = route.params

  const image = () => {
    if (substitution.item.image) {
      return { uri: substitution.item.image }
    } else {
      return placeholder
    }
  }

  const logoImage = () => {
    if (substitution.item.logo) {
      //return {uri: substitution.item.logo}
      return logo
    } else {
      return logo
    }
  }

  // The following is needed for the local notification to work
  if(substitution.item === undefined) {
    substitution.item = substitution
  }

  const benefits = substitution.item.benefits.map((benefit, i) => {
    return (
      <View style={styles.substitutionItemBenefitsItem}
        key={i}
      >
        <Text
          style={{fontSize: 10, color: 'white'}}
        >
          {benefit}
        </Text>
      </View>
    )
  })

  return (
    <View>
      <ImageBackground
        source={image()}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0.0, y: 0.8 }}>
          <Pressable onPress={()=>navigation.pop()}
            style={{paddingHorizontal: 16, paddingTop: 16}}
          >
            <FontAwesome5 name='arrow-left' size={32}/>
          </Pressable>
          <View style={styles.substitutionHeroPreviewComponentBottomElement}>

            <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>

              <View style={{
                backgroundColor: '#FAFAFA', marginTop: 15, padding: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center',
                alignSelf: 'flex-start',
              }}>
                <Image
                  source={logoImage()}
                  style={{ maxWidth: 100, maxHeight: 50, margin: 5, width: 80, height: 40 }}
                  resizeMode={'contain'}
                />

              </View>

              <View style={{ flex: 1, paddingTop: '5%' }}>
                {benefits}
              </View>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, flex: 5 }}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Text style={[styles.whiteText, { fontSize: 33, fontFamily: 'Figtree-ExtraBold' }]}>
                  {substitution.item.title}
                </Text>
                <Pressable onPress={() => navigation.navigate('Haku', {searchParam: substitution.item.department})}>
                  <Text style={[styles.whiteText, { paddingRight: 8, fontWeight: 'bold', fontSize: 20}]}>
                    {substitution.item.department}
                  </Text>
                </Pressable>
              </View>

            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.singleSubstitutionInfoContainer}>
        <View >
          <Text style={[styles.whiteText, {alignSelf: 'flex-start'}]}>
            {formatDate(substitution.item.timing.startTime)}
          </Text>
          <Text style={[styles.whiteText, {alignSelf: 'flex-start'}]}>
            {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
          </Text>
        </View>
        <View>
          <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {formatHourlyPay(substitution.item.hourlyPay)} €/h
            </Text>
            <Text style={{color:'white'}}>
              {' (~' + Math.floor(substitution.item.hourlyPay * (substitution.item.timing.duration/60)) + ' €)'}
            </Text>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text style={styles.whiteText}>{substitution.item.location}</Text>
          </View>
        </View>
      </View>
      <View style={styles.substitutionElement}>
        <Text style={{ paddingHorizontal: 32, paddingVertical: 16}}>
          {substitution.item.description}
        </Text>
      </View>
      <DenyBookmarkAndAcceptButton
        denyCallback={()=>console.log('deny')}
        acceptCallback={()=>acceptSubstitution(substitution.item)}
        bookmarkCallback={()=>console.log('bookmark')}
      />
    </View>
  )
}

export default SingleSubstitutionScreen
