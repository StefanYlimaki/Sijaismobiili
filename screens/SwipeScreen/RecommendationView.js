import {  Text, View, Dimensions, Animated, PanResponder } from 'react-native'
import React, {useRef, useState} from 'react'
import substitutions from '../../assets/data/substitutionsData_new.json'
import styles from '../../assets/styles/styles'
import calculateDistance from '../../utils/calculateDistance'
import { formatDate, formatTime } from '../../utils'
import DenyBookmarkAndAcceptButton from '../../components/DenyBookmarkAndAcceptButtons'
import acceptSubstitution from '../../utils/acceptSubstitution'
import userData from '../../assets/data/userData.json'
import { CommonActions } from '@react-navigation/native'
import { sub } from 'react-native-reanimated'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//Threshold for registering swipes
const SWIPE_THRESHOLD = 120

const RecommendationView = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        {renderSubstitutions(navigation)}
      </View>
    </View>
  )
}

const navigateToPopUp = (navigation, currentIndex) => {
  navigation.navigate('ConfirmSubstitution', {
    substitution: substitutions[currentIndex],
    caller: 'RecommendationView',
  })
}


const renderSubstitutions = (navigation) => {
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
            position.setValue({x: 0, y: 0})
            incrementIndex(prevIndex => prevIndex + 1)
            navigateToPopUp(navigation, currentIndex)
            acceptSubstitution(substitutions[currentIndex])
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
            width:'30%', alignSelf: 'flex-end'}]
          }
          key={i}
          >
            <Text style={{color: 'white', fontFamily: 'Inter-Display', fontSize: 10}}>
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
              height: SCREEN_HEIGHT - 250,
              width: SCREEN_WIDTH - 30,
            },
            styles.recommendationCardAnimated
          ]}
        >
          <View style={{paddingTop:10}}>
            {benefits}
          </View>
          <View style={styles.recommendationCardInfoElement}>
            <Text style={{fontSize: 20, fontFamily: 'Inter-Display'}}>
              {item.title}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 30, fontFamily: 'Inter-Display'}}>
              {item.department}
            </Text>

          </View>
          <View style={styles.recommendationCardInfoBarElement}>
            <View>
              <Text style={styles.recommendationCardInfoBarLeftElement}>
                {formatDate(item.date)} 
              </Text>
              <Text style={styles.recommendationCardInfoBarLeftElement}>
                {formatTime(item.date, item.timing.duration)} 
              </Text>
            </View>
            <View>
              <Text style={styles.recommendationCardInfoBarRightElement}>
                {item.organisation}
              </Text>
              <Text style={styles.recommendationCardInfoBarRightElement}>
                {calculateDistance(
                  parseFloat(item.coordinates.latitude), 
                  parseFloat(item.coordinates.longitude),
                  userData.location.lat,
                  userData.location.lng,
                )}
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCardSalaryElement}>
            <Text style={{fontWeight:'bold', textAlign:'right'}}>
              {item.hourlyPay + '€/h'}
            </Text>
            <Text>
              {'(~' + Math.floor(item.hourlyPay * (item.timing.duration/60)) + '€)'}
            </Text>

          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{textAlign: 'center'}}>
              {item.description}
            </Text>
          </View>

          <DenyBookmarkAndAcceptButton
            denyCallback={()=>incrementIndex(prevIndex => prevIndex + 1)}
            bookmarkCallback={()=>incrementIndex(prevIndex => prevIndex + 1)}
            acceptCallback={()=> {
              navigateToPopUp(navigation, currentIndex)
              acceptSubstitution(substitutions[currentIndex])
            }}
          />
        </Animated.View>
      )
    }
  }).reverse()
}

export default RecommendationView
