import {  Text, View, Dimensions, Animated, PanResponder, ImageBackground } from 'react-native'
import React, {useRef, useState} from 'react'
import substitutions from '../../assets/data/substitutionsData_new.json'
import styles from '../../assets/styles/styles'
import calculateDistance from '../../utils/calculateDistance'
import { formatDate, formatTime } from '../../utils'
import DenyBookmarkAndAcceptButton from '../../components/DenyBookmarkAndAcceptButtons'
import userData from '../../assets/data/userData.json'
import { CommonActions } from '@react-navigation/native'
import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import { StyleSheet } from 'react-native-web'
import { colors } from '../../assets/styles/colors'
import { LinearGradient } from 'expo-linear-gradient'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//Count of cards shown to the user
const CARD_COUNT = 5

//Threshold for registering swipes
const SWIPE_THRESHOLD = 120

const placeholder = {uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'}

const RecommendationView = ({navigation}) => {

  
  const [cardCount, setCardCount] = useState(CARD_COUNT)
  const [tailoredSubstitutions, setTailoredSubstitutions] = useState([])
  const [loading, setLoading] = useState(true)

  async function callOrderAndFilterSubstitutionsByPreferences() {
    const result = await orderAndFilterSubstitutionsByPreferences(substitutions)

    if(result.length < 5){
      setCardCount(result.length)
    }

    //Get first cardCount elements of substitutions
    setTailoredSubstitutions(result.slice(0, cardCount))

    setLoading(false)
  }

  useState(() => {
    const getSubstitutions = async () => {
      await callOrderAndFilterSubstitutionsByPreferences()
    }

    getSubstitutions()
  })

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } else {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <RecommendationCards navigation={navigation} substitutions={tailoredSubstitutions} cardCount={cardCount}/>
        </View>
      </View>
    )
  }
}

const navigateToPopUp = (navigation, currentIndex) => {
  navigation.navigate('ConfirmSubstitution', {
    substitution: substitutions[currentIndex],
    caller: 'RecommendationView',
  })
}




const RecommendationCards = ({navigation, substitutions, cardCount}) => {
  //Position variable for card on top
  const position = useRef(new Animated.ValueXY()).current
  const [currentIndex, incrementIndex] = useState(0)


  const dispatcher = (navigation) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'MainApplication' },
        ],
      })
    )
  }


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
    if (currentIndex > cardCount - 1) {
      navigation.navigate('MainApplication')
      dispatcher(navigation)
    }

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

      const image = () => {
        if (item.image) {
          return {uri: item.image}
        } else {
          return placeholder
        }  
      }

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
            localStyles.recommendationCardAnimated
          ]}
        >
          <ImageBackground
            source={image()}
            imageStyle={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}
            style={{flex: 1}}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.5)']}
              start={{ x: 0, y: 0.3}}
              end={{x: 0.0, y: 0.8}}
              style={{borderTopRightRadius: 10, borderTopLeftRadius: 10, flex: 1}}>
              <View style={{paddingTop:10}}>
                {benefits}
              </View>
              <View style={{flex: 1}}/>
              <View style={localStyles.recommendationCardInfoElement}>
                <Text style={[styles.whiteText, {fontSize: 20, fontFamily: 'Figtree-ExtraBold'}]}>
                  {item.title}
                </Text>
                <Text style={[styles.whiteText, {fontWeight: 'bold', fontSize: 30, fontFamily: 'Inter-Display'}]}>
                  {item.department}
                </Text>

              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={localStyles.recommendationCardInfoBarElement}>
            <View style={{flex:1}}>
              <Text style={localStyles.recommendationCardInfoBarLeftElement}>
                {formatDate(item.date)} 
              </Text>
              <Text style={localStyles.recommendationCardInfoBarLeftElement}>
                {formatTime(item.date, item.timing.duration)} 
              </Text>
            </View>
            <View style={{flex:2, flexShrink: 5}}>
              <Text style={localStyles.recommendationCardInfoBarRightElement}>
                {item.organisation}
              </Text>
              <Text style={localStyles.recommendationCardInfoBarRightElement}>
                {calculateDistance(
                  parseFloat(item.coordinates.latitude), 
                  parseFloat(item.coordinates.longitude),
                  userData.location.lat,
                  userData.location.lng,
                )}
              </Text>
            </View>
          </View>

          <View style={localStyles.recommendationCardSalaryElement}>
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
            }}
          />
        </Animated.View>
      )
    }
  }).reverse()
}

const localStyles = StyleSheet.create({
  recommendationCardAnimated: {
    alignSelf: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    position: 'absolute',
  },
  recommendationCardInfoBarElement: {
    backgroundColor: colors.krBlue,
    flexDirection: 'row',
    flexGrow: 0.2,
    height:'auto',
    justifyContent: 'space-between',
    padding: 10
  },
  recommendationCardInfoBarLeftElement: {
    alignSelf: 'flex-start',
    color: 'white',
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 13,
    opacity: 0.85
  },
  recommendationCardInfoBarRightElement: {
    alignSelf: 'flex-end',
    color: 'white',
    flex: 2,
    flexDirection: 'column',
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 13,
    opacity: 0.85,
  },
  recommendationCardInfoElement: {
    flexDirection: 'column',
    paddingLeft: 10,
    //paddingTop: '25%'
  },
  recommendationCardSalaryElement: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    padding: 10
  },
})

export default RecommendationView
