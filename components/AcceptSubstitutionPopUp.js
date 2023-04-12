import { krBlue, krGreen, textLight } from '../assets/styles/colors'
import PopupDialog from './PopupDialog'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { success } from '../assets/styles/colors'
import { formatDate, formatTime } from '../utils'
import acceptSubstitution from '../utils/acceptSubstitution'
import { logUserData } from '../utils/logUserData'

const AcceptSubstitutionPopUp = ({route, navigation}) => {
  return (
    <PopupDialog headerText={'No voi kun kiva!'} headerColor={krBlue} navigation={navigation} 
      popCount={2}>
      <View>

      </View>
      <View style={{justifyContent: 'center', paddingVertical: 25, paddingHorizontal: 15}}>
        <View>
          <Text style={{fontWeight:'600', fontSize:16}}>
            {route.params.substitution.title}
          </Text>
          <Text style={{fontWeight:'600', fontSize:19}}>
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
            <Text style={{fontWeight:'bold', alignSelf: 'flex-end', color:krGreen}}>
              {route.params.substitution.hourlyPay + '€/h'}
            </Text>
          </View>
        </View>
        <View style={{borderRadius: 20, backgroundColor: success, marginTop: 20}}>
          <Pressable style={styles.acceptButton} onPress={()=> {
            acceptSubstitution(route.params.substitution)
            route.params.onAccept()
          }}>
            <Text style={styles.buttonText}>{'Otan keikan!'}</Text>
          </Pressable>
        </View>
      </View>
    </PopupDialog>
  )
}

const styles = StyleSheet.create({
  acceptButton: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: '5%',
    width: '100%'
  },
  buttonText: {
    alignSelf: 'center', 
    color: textLight, 
    fontFamily: 'Inter-DisplayBlack',
    fontSize: 25, 
    fontWeight: 'bold'
  },
  substitutionInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

})

export default AcceptSubstitutionPopUp