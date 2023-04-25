
import {
  Pressable,
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
import {formatDate, formatHourlyPay, formatTime} from '../utils'
import calculateDistance from '../utils/calculateDistance'
import DenyBookmarkAndAcceptButton from '../components/DenyBookmarkAndAcceptButtons'
import acceptSubstitution from '../utils/acceptSubstitution'
import { colors } from '../assets/styles/colors'
import {LinearGradient} from 'expo-linear-gradient'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width - 50

//Threshold for registering swipes
const SWIPE_THRESHOLD = 120

const logo = { uri: 'https://www.sttinfo.fi/data/images/00063/de7b594d-309c-4622-8e66-b8d8b84dafd3-w_300_h_100.png' }

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

const navigateToSingleSubstitutionScreen = (navigation, item) => { 
  navigation.navigate('SingleSubstitution', {
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
            navigateToPopUp(navigation, item)
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
    outputRange: ['-10deg', '0deg', '0deg'],
    extrapolate: 'clamp'
  })

  //Move and rotate card
  const rotateAndTranslate = {
    transform: [
      {rotate: rotatePosition},
      {translateX: position.x},
      {translateY: position.y},
      {rotateY: position.x.interpolate({ inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2], outputRange: ['90deg', '0deg', '0deg'], extrapolate: 'clamp' })},
      {scale: position.x.interpolate({ inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2], outputRange: [0.7, 1, 1.1], extrapolate: 'clamp' })},
    ]
  }

  //Render cards from JSON
  const benefits = item.benefits.map((benefit, i) => {
    return (
      <View style={[styles.substitutionItemBenefitsItem, {
        alignSelf: 'flex-end',
        marginVertical: 5,
      }
      ]}
      key={i}
      >
        <Text style=
          {[styles.whiteText, {
            fontSize: 16,
            fontFamily: 'Inter-DisplaySemiBold',
          }
          ]}
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
      {...panResponder.panHandlers}
      style={[
        rotateAndTranslate,
        {
          height: SCREEN_HEIGHT - 250,
          width: SCREEN_WIDTH,
        },
        styles.substitutionCardAnimated
      ]}
    >
      <ImageBackground
        source={image()}
        imageStyle={{borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          start={{ x: 0, y: 0.3}}
          end={{x: 0.0, y: 0.8}}
          style={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
          <View style={styles.substitutionHeroPreviewComponentBottomElement}>

            <View style={{ flexDirection: 'row', alignContent: 'space-between'}}>

              <View style={{ backgroundColor: '#FAFAFA', marginTop: 15, padding:5, borderRadius: 10, flexDirection: 'row', alignItems: 'center',
                alignSelf: 'flex-start',}}>
                <Image
                  source={logoImage()}
                  style={{maxWidth: 100, maxHeight: 50, margin: 5, width: 80, height: 40}}
                  resizeMode={'contain'}
                />

              </View>

              <View style={{ flex: 1, paddingTop: '5%' }}>
                {benefits}
              </View>

            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, flex: 5}}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end'}}>
                <Text style={[styles.whiteText, { fontSize: 33, fontFamily: 'Figtree-ExtraBold'}]}>
                  {item.title}
                </Text>
                <Text style={[styles.whiteText, { paddingRight: 8, fontWeight: 'bold', fontSize: 20}]}>
                  {item.department}
                </Text>
              </View>

            </View>
          </View>
        </LinearGradient>
      </ImageBackground>


      <View style={styles.recommendationCardInfoBarElement}>
        <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>
          <Text style={styles.whiteText}>
            {formatDate(item.timing.startTime)}
          </Text>
          <Text style={styles.whiteText}>
            {formatTime(item.timing.startTime, item.timing.duration)}
          </Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'flex-end', flex:2}}>
          <Text style={styles.substItemOrganisationText}>
            {item.organisation}
          </Text>
          <Text style={styles.whiteText}>
            {calculateDistance(item.location)}
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

      <View style={{paddingHorizontal: 16, flex: 3}}>
        <Pressable style={{ paddingHorizontal: 16, height: 50, borderColor: '#000', borderStyle: 'solid', borderWidth: 1 }} onPress={() => {console.log('m'), navigateToSingleSubstitutionScreen(navigation, item)}} >
          <Text >{item.description}</Text>
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
          navigateToPopUp(navigation, item)
        }}
      />
    </Animated.View>
  )
}

export default SubstitutionCard

