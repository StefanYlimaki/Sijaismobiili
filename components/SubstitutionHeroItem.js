import {View, Text, StyleSheet, Pressable, Animated, ImageBackground} from 'react-native'
import { formatHourlyPay, formatDate, formatTime } from '../utils'
import styles from '../assets/styles/styles'
import calculateDistance from '../utils/calculateDistance'
import { LinearGradient } from 'expo-linear-gradient'


const image = { uri: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' }
const SubstitutionItem = ({ substitution, navigation }) => {

  const getDistance = () => {
    return calculateDistance(parseFloat(substitution.item.coordinates.latitude), parseFloat(substitution.item.coordinates.longitude), 65.05941, 25.46642, false)
  }

  return (
    <Animated.View style={styles.substitutionHeroItemContainer}>
      <Pressable
        onPress={() =>
          navigation.navigate('SubstitutionCard', {
            substitution: substitution,
            navigation: navigation
          })
        }
        style={({ pressed }) => pressed && styles.pressedSubstitutionItem}
      >
        <View style={styles.substitutionPreviewComponent}>

          <View style={styles.substitutionPreviewComponentTopElement}>
            <View style={{flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>
              <Text style={styles.whiteText}>
                {formatDate(substitution.item.timing.startTime)}
              </Text>
              <Text style={styles.whiteText}>
                {formatTime(substitution.item.timing.startTime, substitution.item.timing.duration)}
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-end', flex:2}}>
              <Text style={styles.substItemOrganisationText}>
                {substitution.item.organisation}
              </Text>
              <Text style={styles.whiteText}>
                {getDistance(substitution.item.location)}
              </Text>
            </View>
          </View>
          <ImageBackground
              source={image}
              imageStyle={styles.bgimage}
          >
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                start={{ x: 0, y: 0.3}}
                end={{x: 0.0, y: 0.8}}
            style={{borderRadius: 20}}>
            <View style={[styles.substitutionHeroPreviewComponentBottomElement ]}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, height: '90%'}}>
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Text style={[styles.whiteText, { fontSize: 30, fontFamily: 'Inter-DisplayBlack'}]}>
                      {substitution.item.title}
                    </Text>
                    <Text style={[styles.whiteText, { paddingRight: 8, fontWeight: 'bold', fontSize: 20}]}>
                      {substitution.item.department}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'column'}}>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                      <Text style={ styles.hourlypay}>
                        {formatHourlyPay(substitution.item.hourlyPay)}€/h
                      </Text>
                      <Text style={ styles.hourlypayTotal}>
                        (~{formatHourlyPay((substitution.item.timing.duration / 60) * substitution.item.hourlyPay)} €)
                      </Text>
                    </View>
                    {substitution.item.benefits.length !== 0
                      ? <View>
                        {substitution.item.benefits.map(b =>
                          <View key={ b } style={styles.substitutionItemBenefitsItem} >
                            <Text style={styles.whiteText} >
                              {b}
                            </Text>
                          </View>
                        )}
                      </View>
                      :<></>
                    }

                  </View>
                </View>
          </View>
          </LinearGradient>
      </ImageBackground>
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default SubstitutionItem
