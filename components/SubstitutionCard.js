
import {
  Pressable,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  ImageBackground,
  Alert
} from 'react-native'
import React, {useRef, useState} from 'react'
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur'
import styles from '../assets/styles/styles'
import { krBlue } from '../assets/styles/colors'
import { formatDate, formatTime } from '../utils'
import calculateDistance from '../utils/calculateDistance'
import DenyBookmarkAndAcceptButton from '../components/DenyBookmarkAndAcceptButtons'
import acceptSubstitution from '../utils/acceptSubstitution'
import { krGreenLight } from '../assets/styles/colors'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width - 50

//Threshold for registering swipes
const SWIPE_THRESHOLD = 120

const SubstitutionCard = ({route}) => {
  return (

    <View style={ {backgroundColor: 'rgba(0,0,0,0.3)'} }>
      <BlurView intensity={10} style={ {height: '100%'} }>
        <View style={{flexDirection: 'column', marginTop: Constants.statusBarHeight + 20}}>
          {renderSubstitution(route.params.substitution.item, route.params.navigation)}
        </View>
      </BlurView>
    </View>

  )
}

const navigateToPopUp = (navigation, item) => {
  navigation.navigate('ConfirmSubstitution', {
    substitution: item,
    caller: 'SubstitutionCard',
  })
}

const renderSubstitution = (item, navigation) => {
  //Position variable for card on top
  const position = useRef(new Animated.ValueXY()).current


  //Create panresponder for swiping cards
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dx !== 0 && gestureState.dy !== 0
      },

      //Update position variable when moved
      onPanResponderMove: Animated.event([null, {dx: position.x,
        dy: position.y}], {useNativeDriver: false}),

      //Called when card is released
      onPanResponderRelease: (evt, gestureState) => {
        //Accept / Right swipe
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
            useNativeDriver: false,
            speed: 24
          }
          ).start(() => {
            const nowInMillis = new Date().getTime()
            const subStartTime = new Date(item.timing.startTime)
            const subsStartTimeInMillis = subStartTime.getTime()

            if(nowInMillis > subsStartTimeInMillis){
              Alert.alert('Kiinnittäytyminen ei onnistunut','Et voi kiinnittäytyä jo alkaneeseen vuoroon', [{ text: 'Selvä', style: 'cancel' }])
              navigation.pop()
            } else {
              navigateToPopUp(navigation, item)
            }
          })

        //Deny / Left swipe
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: false
          }
          ).start(() => {
            navigation.pop()
          })

        //Return card to original position
        } else {
          Animated.spring(position, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false
          }).start()
        }

      }
    })
  ).current

  //Rotate card based on how far it has been dragged
  const rotatePosition = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  //Move and rotate card
  const rotateAndTranslate = {
    transform: [
      {rotate: rotatePosition},
      {translateX: position.x},
      {translateY: position.y}
    ]
  }


  //Render cards from JSON
  const benefits = item.benefits.map((benefit, i) => {
    return (
      <View style={[styles.substitutionItemBenefitsItem, {
        width:'30%',
        alignSelf: 'flex-end'

      }
      ]}
      key={i}
      >
        <Text
          //style={{alignSelf: 'flex-end'}}
        >
          {benefit}
        </Text>
      </View>
    )
  })

  const placeholder = {uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'}
  const test = {uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'}



  const image = () => {
    if (item.image) {
      return {uri: item.image}
    } else {
      return placeholder
    }  }


  return (
    <Animated.View 
      {...panResponder.panHandlers}
      style={[
        rotateAndTranslate,
        {
          height: SCREEN_HEIGHT - 120,
          width: SCREEN_WIDTH,
        },
        styles.substitutionCardAnimated
      ]}
    >

      <ImageBackground
        source={image()}
      >
        <View>
          <View style={{paddingTop:'5%'}}>
            {benefits}
          </View>
          <View style={styles.substitutionCardInfoElement}>
          </View>

          <View style={styles.substitutionCardInfoElement}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 20}}>
              {item.department}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.substitutionCardInfoBar}>
        <View>
          <Text style={styles.substitutionCardInfoBarLeftElement}>
            {formatDate(item.date)} 
          </Text>
          <Text style={styles.substitutionCardInfoBarLeftElement}>
            {formatTime(item.date, item.timing.duration)} 
          </Text>
        </View>
        <View>
          <Text style={styles.substitutionCardInfoBarRightTopElement}>
            {item.organisation}
          </Text>
          <Text style={styles.substitutionCardInfoBarRighBotElement}>
            {calculateDistance(
              parseFloat(item.coordinates.latitude), 
              parseFloat(item.coordinates.longitude),
              65.05941,
              25.46642
            )}
          </Text>
        </View>
      </View>

      <View style={styles.substitutionCardSalaryItem}>
        <Text style={{fontWeight:'bold', textAlign:'right'}}>
          {item.hourlyPay + '€/h'}
        </Text>
        <Text>
          {'(~' + Math.floor(item.hourlyPay * (item.timing.duration/60)) + '€)'}
        </Text>

      </View>

      <View style={{paddingHorizontal: 16}}>
        <Pressable >
          <Text>{item.description}</Text>
        </Pressable>
      </View>

      <DenyBookmarkAndAcceptButton
        denyCallback={()=>{
          navigation.pop()
        }}
        bookmarkCallback={()=>{
          navigation.pop()
        }}
        acceptCallback={()=>{
          const nowInMillis = new Date().getTime()
          const subStartTime = new Date(item.timing.startTime)
          const subsStartTimeInMillis = subStartTime.getTime()

          if(nowInMillis > subsStartTimeInMillis){
            Alert.alert('Kiinnittäytyminen ei onnistunut','Et voi kiinnittäytyä jo alkaneeseen vuoroon', [{ text: 'Selvä', style: 'cancel' }])
          } else {
            navigateToPopUp(navigation, item)
          }
          
        }}
      />
    </Animated.View>
  )
}

export default SubstitutionCard

