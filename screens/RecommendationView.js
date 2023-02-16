import { Pressable, Component, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native'

import React, {useRef, useState} from 'react'
import substitutions from '../assets/data/substitutionsData_new.json'
import styles from '../assets/styles/styles'
import { krBlue } from '../assets/styles/colors' 
import calculateDistance from '../utils/calculateDistance'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//Threshold for registering swipes
const SWIPE_THRESHOLD = 120

const RecommendationView = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <View style={{height:60}}>
      </View>
      <View style={{flex:1}}>
        {renderSubstitutions()}
      </View>
      <View style={{height:60}}>
      </View>
    </View>
  )
}

const renderSubstitutions = () => {
  //Position variable for card on top
  const position = useRef(new Animated.ValueXY()).current
  const [currentIndex, incrementIndex] = useState(0)

  //Create panresponder for swiping cards
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,

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
            incrementIndex(prevIndex => prevIndex + 1)
            position.setValue({x: 0, y: 0})
          })

        //Deny / Left swipe
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: false
          }
          ).start(() => {
            incrementIndex(prevIndex => prevIndex + 1)
            position.setValue({x: 0, y: 0})
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

  //Make opacity of the next card greater when top card is dragged
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })

  //Make the next card bigger when top card is dragged
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })

  //Render cards from JSON
  return substitutions.map((item, i) => {
    if (i < currentIndex) {
      return null
    } else {

      const benefits = item.benefits.map((benefit, i) => {
        return (
          <View style={[styles.substitutionItemBenefitsItem, {
            width:'30%',
            flexDirection: 'column'

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
          key={i}
          //If card is on top, apply panresponder
          {...i == currentIndex? panResponder.panHandlers: null}
          style={[
            //If card is on top, apply rotation
            (i == currentIndex? rotateAndTranslate: null),
            //If card is NOT on top, apply scale
            (i != currentIndex? {transform: [{scale: nextCardScale}]}: null),
            //If card is NOT on top, apply opacity
            (i != currentIndex? {opacity: nextCardOpacity}: null),
            {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              position: 'absolute',
              backgroundColor: 'white',
              borderRadius: 20,
              resizeMode: 'cover'
            }
          ]}
        >
          <View style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
            height: '15%',
            paddingTop: 20
          }}>
            {benefits}
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
            flexDirection: 'column',
          }}>
            <Text style={{
              color: 'white',
              alignSelf: 'flex-start',
              fontSize: 13
            }}>
              {parseDate(item.date)} 
            </Text>
            <Text style={{
              color: 'white',
              alignSelf: 'flex-start',
              fontSize: 13
            }}>
              {parseTime(item.date, item.timing.duration)} 
            </Text>
            <Text style={{
              color: 'white',
              alignSelf: 'flex-end',
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

          <View style={{
            paddingTop: '60%',
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Pressable style={{
              width: '30%'
            }}
            onPress={() => {
              incrementIndex(prevIndex => prevIndex + 1)
            }}
            >
              <View style={{
                backgroundColor: '#91041D',
                width: 100,
                height: 100,
                borderRadius: 50
              }}>
              </View>
            </Pressable>

            <Pressable style={{
              width: '30%'
            }}
            >
              <View style={{
                backgroundColor: '#0666DB',
                width: 100,
                height: 100,
                borderRadius: 50
              }}>
              </View>
            </Pressable>

            <Pressable style={{
              width: '30%'
            }}
            onPress={() => {
              incrementIndex(prevIndex => prevIndex + 1)
            }}
            >
              <View style={{
                backgroundColor: '#13912A',
                width: 100,
                height: 100,
                borderRadius: 50
              }}>
              </View>
            </Pressable>
          </View>
        </Animated.View>
      )
    }
  }).reverse()
}

const parseDate = (rawDate) => {
  const date = new Date(rawDate)
  return (date.toDateString())
}

const parseTime = (rawDate, duration) => {
  const startDate = new Date(rawDate)
  const endDate = new Date(startDate.getTime() + duration*60000)

  
  return startDate.toLocaleTimeString() + '-' + endDate.toLocaleTimeString()
}

export default RecommendationView