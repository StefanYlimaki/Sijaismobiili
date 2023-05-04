import {Text, View, Dimensions, Animated, PanResponder, ImageBackground, Image, Pressable} from 'react-native'
import React, {useRef, useState} from 'react'
import styles, {fontSizes} from '../../assets/styles/styles'
import calculateDistance from '../../utils/calculateDistance'
import { formatDate, formatTime } from '../../utils'
import DenyBookmarkAndAcceptButton from '../../components/DenyBookmarkAndAcceptButtons'
import userData from '../../assets/data/userData.json'
import { CommonActions } from '@react-navigation/native'
import { orderAndFilterSubstitutionsByPreferences } from '../../utils/orderAndFilterSubstitutionsByPreferences'
import { StyleSheet } from 'react-native-web'
import { colors } from '../../assets/styles/colors'
import { LinearGradient } from 'expo-linear-gradient'
import saveSubstitution from '../../utils/saveSubstitution'
import {Feather} from '@expo/vector-icons'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//Threshold for registering swipes
const SWIPE_THRESHOLD = 120
const TOUCH_THRESHOLD = 20

const logo = { uri: 'https://www.sttinfo.fi/data/images/00063/de7b594d-309c-4622-8e66-b8d8b84dafd3-w_300_h_100.png' }
const placeholder = {uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8'}

const RecommendationView = ({navigation, substitutions}) => {
  return (
    <View style={{flex:1}}>
      <RecommendationCards navigation={navigation} substitutions={substitutions} cardCount={substitutions.length}/>
    </View>
  )
}

const navigateToPopUp = (navigation, currentIndex, substitutions) => {
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
      onMoveShouldSetPanResponder: (e, gestureState) => {
        const {dx, dy} = gestureState
        return (Math.abs(dx) > TOUCH_THRESHOLD || (Math.abs(dy) > TOUCH_THRESHOLD))
      },

      onStartShouldSetPanResponder: () => false,

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
            navigateToPopUp(navigation, currentIndex, substitutions)
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

      const placeholder = { uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' }
      const test = { uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' }

      const getDistance = () => {
        return calculateDistance(parseFloat(item.coordinates.latitude), parseFloat(item.coordinates.longitude), 65.05941, 25.46642, false)
      }

      const image = () => {
        if (item.image) {
          return { uri: item.image }
        } else {
          return placeholder
        }
      }

      const logoImage = () => {
        if (item.logo) {
          //return {uri: substitution.item.logo}
          return logo
        } else {
          return logo
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
              height: SCREEN_HEIGHT / 1.5,
              width: SCREEN_WIDTH / 1.1,
            },
            localStyles.recommendationCardAnimated
          ]}
        >
          <ImageBackground
            source={image()}
            imageStyle={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.5)']}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0.0, y: 0.8 }}
              style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
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
                      {item.title}
                    </Text>
                    <Pressable onPress={() => navigation.navigate('Haku', {searchParam: item.department})}>
                      <Text style={[styles.whiteText, { paddingRight: 8, fontWeight: 'bold', fontSize: 20}]}>
                        {item.department}
                      </Text>
                    </Pressable>
                  </View>

                </View>
              </View>
            </LinearGradient>
          </ImageBackground>


          <View style={[styles.substitutionPreviewComponentTopElement, {height: fontSizes.md * 2, backgroundColor: colors.krGreen, borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flexDirection: 'column', flex: 5, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', flex: 1}}>
                    <Feather name='calendar' size={fontSizes.md} color='white'/>
                    <Text style={[styles.whiteText, { marginLeft: 5, fontSize: fontSizes.md }]}>
                      {formatDate(item.timing.startTime)}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', flex: 2, alignItems: 'flex-start'}}>
                    <Feather name='clock' size={fontSizes.md} color='white'/>
                    <Text style={[styles.whiteText, { marginLeft: 5, fontSize: fontSizes.md }]}>
                      {formatTime(item.timing.startTime, item.timing.duration)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'column', alignItems: 'flex-end', flexBasis: 50}}>
                <View style={{flexDirection: 'row'}}>
                  <Feather name='map-pin' size={fontSizes.md} color='white'/>
                  <Text style={[styles.whiteText, { marginLeft: 5}]}>
                    {getDistance(item.location)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.substitutionCardSalaryItem}>
            <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>
              {item.hourlyPay + ' €/h'}
            </Text>
            <Text>
              {' (~' + Math.floor(item.hourlyPay * (item.timing.duration / 60)) + ' €)'}
            </Text>

          </View>

          <View style={{ paddingHorizontal: 16, flex: 3 }}>
            <Pressable style={{ paddingHorizontal: 16, height: 50 }}
              accessibilityRole="button"
              accessibilityLabel="Avaa lisätiedot"
              accessibilityHint='Avaa keikan tiedot koko näytön näkymään'
              onPress={() => { console.log('m'), navigateToSingleSubstitutionScreen(navigation, item) }} >
              <Text >{item.description}</Text>
            </Pressable>
          </View>

          <DenyBookmarkAndAcceptButton
            denyCallback={() => {
              navigation.pop()
            }}
            bookmarkCallback={() => {
              saveSubstitution(item)
              updateList()
              navigation.pop()
            }}
            acceptCallback={() => {
              navigateToPopUp(navigation, item)
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
})

export default RecommendationView
