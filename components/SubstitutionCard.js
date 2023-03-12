
import { Pressable, Component, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native'
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
    <BlurView intensity={5} style={{flex: 1, backgroundColor: 'rgba(58,58,58,0.5)'}}>
      <View style={{flexDirection: 'column', marginTop: Constants.statusBarHeight + 20}}>
        {renderSubstitution(route.params.substitution.item, route.params.navigation)}
      </View>
    </BlurView>
  )
  
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
        return gestureState.dx != 0 && gestureState.dy != 0
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
            useNativeDriver: false
          }
          ).start(() => {
            acceptSubstitution(item.id)
            navigation.pop()
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


  return (
    <Animated.View 
      //If card is on top, apply panresponder
      {...panResponder.panHandlers}
      style={[
        //If card is on top, apply rotation
        rotateAndTranslate,
        {
          height: SCREEN_HEIGHT - 120,
          width: SCREEN_WIDTH,
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: 20,
          resizeMode: 'cover',
          alignSelf: 'center',
        }
      ]}
    >
      <View style={{paddingVertical:20}}>
        {benefits}
      </View>
      <View style={{
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: '15%',
        paddingTop: 20
      }}>
      </View>
      <View style={{
        flexDirection: 'column',
        paddingLeft: 10
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 30
        }}>
          {item.title}
        </Text>
        <Text style={{
          fontSize: 20
        }}>
          {item.department}
        </Text>

      </View>
      <View style={{
        marginTop: 20,
        padding: 10,
        backgroundColor: krBlue,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: '10%'
      }}>
        <View>
          <Text style={{
            color: 'white',
            alignSelf: 'flex-start',
            fontSize: 13
          }}>
            {formatDate(item.date)} 
          </Text>
          <Text style={{
            color: 'white',
            alignSelf: 'flex-start',
            fontSize: 13
          }}>
            {formatTime(item.date, item.timing.duration)} 
          </Text>
        </View>
        <View>
          <Text style={{
            color: 'white',
            alignSelf: 'flex-end',
            flexDirection: 'column',
            alignItems: 'flex-end',
            flex:2,
            fontSize: 13
          }}>
            {item.organisation}
          </Text>
          <Text style={{
            color: 'white',
            alignSelf: 'flex-end',
            fontSize: 13
          }}>
            {calculateDistance(
              parseFloat(item.coordinates.latitude), 
              parseFloat(item.coordinates.longitude),
              65.05941,
              25.46642
            )}
          </Text>
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        padding: 10
      }}>
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
          acceptSubstitution(item.id)
          navigation.pop()
        }}
      />
    </Animated.View>
  )
}

export default SubstitutionCard

