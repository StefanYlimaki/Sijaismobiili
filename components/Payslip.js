import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/themed'
import { colors } from '../assets/styles/colors'
import style from '../assets/styles/styles'

function Payslip({ navigation }) {
  return (
    <Pressable style={payslipStyles.cardContainer} onPress={() => navigation.navigate('PayslipScreen')}>
      <View style={payslipStyles.payslipCard}>
        <View style={payslipStyles.iconContainer}>
          <Icon name='currency-eur' type="material-community" color={'#FFF'} size={15}/>
        </View>
        
        <Text style={{ textAlign: 'center' }}>Kuluneen kuun aikana olet ansainnut</Text>
        <Text style={style.h2}>~ 200 €</Text>
        <Text style={{ textAlign: 'center' }}>Tarkastele palkkakuittiasi</Text>
      </View>
    </Pressable>
  )
}

const payslipStyles = StyleSheet.create({
  cardContainer: {
  },
  iconContainer: {
    backgroundColor: colors.krBlue,
    borderRadius: 100,
    height: 30,
    justifyContent: 'center',
    left: 10,
    position: 'absolute',
    top: 10,
    width: 30
  },
  payslipCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    minHeight: 130
  }
})

export default Payslip