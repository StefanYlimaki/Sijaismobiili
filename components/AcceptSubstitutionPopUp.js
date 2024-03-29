import PopupDialog from './PopupDialog'
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import { colors } from '../assets/styles/colors'
import { formatDate, formatTime } from '../utils'
import acceptSubstitution from '../utils/acceptSubstitution'
import { CommonActions } from '@react-navigation/native'
import {fontSizes} from '../assets/styles/styles'

const AcceptSubstitutionPopUp = ({route, navigation}) => {

  const dispatcher = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'MainApplication' },
        ],
      })
    )
  }

  const nowInMillis = new Date().getTime()
  const subStartTime = new Date(route.params.substitution.timing.startTime)
  const subsStartTimeInMillis = subStartTime.getTime()
  
  if(nowInMillis > subsStartTimeInMillis){
    Alert.alert('Kiinnittäytyminen ei onnistunut','Et voi kiinnittäytyä jo alkaneeseen vuoroon', [{ text: 'Selvä', style: 'cancel', onPress: (() => {
      navigation.pop()
      navigation.pop()
    } ) }])
  } else {

    return (
      <PopupDialog headerText={'No voi kun kiva!'} headerColor={colors.krBlue} navigation={navigation}
        popCount={2}>
        <View>

        </View>
        <View style={{justifyContent: 'center', paddingVertical: 25, paddingHorizontal: 15}}>
          <View>
            <Text style={{fontWeight:'600', fontSize: fontSizes.md}}>
              {route.params.substitution.title}
            </Text>
            <Text style={{fontWeight:'600', fontSize: fontSizes.lg}}>
              {route.params.substitution.department}
            </Text>
          </View>
          <View style={styles.substitutionInfoContainer}>
            <View>
              <Text style={{alignSelf: 'flex-start'}}>
                {formatDate(route.params.substitution.timing.startTime)}
              </Text>
              <Text style={{alignSelf: 'flex-start'}}>
                {formatTime(route.params.substitution.timing.startTime, 
                  route.params.substitution.timing.duration
                )}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontWeight:'bold', alignSelf: 'flex-end', color: colors.krGreen}}>
                {route.params.substitution.hourlyPay + '€/h'}
              </Text>
            </View>
          </View>
          <View style={{borderRadius: 20, backgroundColor: colors.success, marginTop: 20}}>
            <Pressable style={styles.acceptButton} 
              accessibilityRole="button"
              accessibilityLabel="Hyväksy keikka"
              accessibilityHint='Hyväksy painamalla painiketta'
              onPress={()=> {
                const nowInMillis = new Date().getTime()
                const subStartTime = new Date(route.params.substitution.timing.startTime)
                const subsStartTimeInMillis = subStartTime.getTime()
  
                if(nowInMillis > subsStartTimeInMillis){
                  Alert.alert('Kiinnittäytyminen ei onnistunut','Et voi kiinnittäytyä jo alkaneeseen vuoroon', [{ text: 'Selvä', style: 'cancel' }])
                } else {
                  acceptSubstitution(route.params.substitution)
                }

                if (route.params.caller == 'RecommendationView') {
                  navigation.navigate('MainApplication')
                  dispatcher()
                  navigation.navigate('GigConfirmedPopup', {substitution: route.params.substitution, waitingForConfirmation: route.params.substitution.needsConfirmation})
                } else if (route.params.caller == 'SubstitutionCard') {
                  navigation.pop(2)
                  navigation.navigate('GigConfirmedPopup', {substitution: route.params.substitution, waitingForConfirmation: route.params.substitution.needsConfirmation})
                }
              }}>
              <Text style={styles.buttonText}>{'Otan keikan!'}</Text>
            </Pressable>
          </View>
        </View>
      </PopupDialog>
    )
  }}

const styles = StyleSheet.create({
  acceptButton: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: '5%',
    width: '100%'
  },
  buttonText: {
    alignSelf: 'center', 
    color: colors.textLight,
    fontFamily: 'Inter-DisplayBlack',
    fontSize: fontSizes.xxl,
    fontWeight: 'bold'
  },
  substitutionInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})

export default AcceptSubstitutionPopUp