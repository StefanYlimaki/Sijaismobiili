import { Component, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native'
import React, {useRef, useState} from 'react'
import substitutions from '../assets/data/substitutionsData_new.json'
import styles from '../assets/styles/styles'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 120

const renderSubstitutions = () => {
  const position = useRef(new Animated.ValueXY()).current
  const [currentIndex, incrementIndex] = useState(0)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: position.x,
        dy: position.y}], {useNativeDriver: false}),
      onPanResponderRelease: (evt, gestureState) => {
        //Kiinnittäydy
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
            useNativeDriver: false
          }
          ).start(() => {
            incrementIndex(prevIndex => prevIndex + 1)
            position.setValue({x: 0, y: 0})
          })

        //Kieltäydy
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
            useNativeDriver: false
          }
          ).start(() => {
            incrementIndex(prevIndex => prevIndex + 1)
            position.setValue({x: 0, y: 0})
          })

        //Palauta kortti alkuasemaan
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

  const rotatePosition = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  const rotateAndTranslate = {
    transform: [
      {rotate: rotatePosition},
      {translateX: position.x},
      {translateY: position.y}
    ]
  }

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })

  return substitutions.map((item, i) => {
    if (i < currentIndex) {
      return null
    } else if (i == currentIndex) {
      return (
        <Animated.View 
          {...panResponder.panHandlers}
          key={i}
          style={[rotateAndTranslate,
            {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 20,
              resizeMode: 'cover'
            }
          ]}
        >
          <View>
            <Text>
              {item.title}
            </Text>
          </View>
          <View>
            <Text>
              {item.location}
            </Text>
          </View>
        </Animated.View>
      )
    } else {
      return (
        <Animated.View 
          key={i}
          style={{
            height: SCREEN_HEIGHT - 120,
            opacity: nextCardOpacity,
            transform: [{scale: nextCardScale}],
            width: SCREEN_WIDTH,
            padding: 10,
            position: 'absolute',
            backgroundColor: 'blue',
            borderRadius: 20,
            resizeMode: 'cover'
          }}
        >
          <View>
            <Text>
              {item.title}
            </Text>
          </View>
          <View>
            <Text>
              {item.location}
            </Text>
          </View>
        </Animated.View>
      )
    }
  }).reverse()
}

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
export default RecommendationView