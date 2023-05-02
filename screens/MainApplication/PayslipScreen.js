import { View, Text, StyleSheet, Pressable } from 'react-native'
import style from '../../assets/styles/styles'

function PayslipScreen() {
  return (
    <View style={payslipStyles.screenContainer}>

      <Text style={payslipStyles.boldText}>Palkkajakso: 1.1.2023 - 31.1.2023</Text>

      <View style={payslipStyles.sectionDivider} />

      <Text style={[payslipStyles.boldText, { marginBottom: 10 }]}>Tehdyt vuorot</Text>
      <Text style={style.blackText}>28.1.2023 10.15 - 18.15 (7,50h)</Text>
      <Text style={style.blackText}>    Anestesiahoitaja</Text>
      <Text style={style.blackText}>14.1.2023 16.00 - 21.15 (5,25h)</Text>
      <Text style={style.blackText}>    Anestesiahoitaja</Text>
      <Text style={style.blackText}>9.1.2023 11.00 - 15.00 (4,00h)</Text>
      <Text style={style.blackText}>    Sairaanhoitaja</Text>

      <View style={payslipStyles.sectionDivider} />

      <Text style={payslipStyles.boldText}>Tunnit yhteensä: 16,75 h</Text>

      <View style={payslipStyles.sectionDivider} />

      <View style={payslipStyles.payTable}>
        <View style={payslipStyles.bigColumn}>
          { /* Palkkalaji */ }
          <Text style={[payslipStyles.boldText, { marginBottom: 10 }]}>Palkkalaji</Text>

          <Text style={style.blackText}>Anestesiahoitaja</Text>
          <Text style={style.blackText}>Anestesiahoitaja</Text>
          <Text style={style.blackText}>Sairaanhoitaja</Text>
          <Text style={style.blackText}>Iltalisä Muu-Suomi</Text>
          <Text style={style.blackText}>Bonus</Text>
          <Text style={style.blackText}>Työeläkemaksu</Text>
        </View>
        <View style={payslipStyles.smallColumn}>
          { /* Määrä */ }
          <Text style={[payslipStyles.boldText, { marginBottom: 10 }]}>Määrä</Text>

          <Text style={style.blackText}>7,50</Text>
          <Text style={style.blackText}>5,25</Text>
          <Text style={style.blackText}>4,00</Text>
          <Text style={style.blackText}>5,00</Text>
          <Text style={style.blackText}>1,00</Text>
        </View>
        <View style={payslipStyles.smallColumn}>
          { /* Hinta */ }
          <Text style={[payslipStyles.boldText, { marginBottom: 10 }]}>Hinta</Text>

          <Text style={style.blackText}>10,00</Text>
          <Text style={style.blackText}>11,00</Text>
          <Text style={style.blackText}>12,00</Text>
          <Text style={style.blackText}>3,29</Text>
          <Text style={style.blackText}>30,00</Text>
          <Text style={style.blackText}></Text>
        </View>
        <View style={payslipStyles.smallColumn}>
          { /* Yht. */ }
          <Text style={[payslipStyles.boldText, { marginBottom: 10 }]}>Yht.</Text>

          <Text style={style.blackText}>75,00</Text>
          <Text style={style.blackText}>57,75</Text>
          <Text style={style.blackText}>48,00</Text>
          <Text style={style.blackText}>16,45</Text>
          <Text style={style.blackText}>30,00</Text>
          <Text style={style.blackText}>-5,24</Text>
        </View>
      </View>

      <View style={payslipStyles.sectionDivider} />

      <Text style={payslipStyles.boldText}>Maksetaan: 221,96 €</Text>
      
    </View>
  )
}

const payslipStyles = StyleSheet.create({
  bigColumn: {
    flex: 2,
    flexDirection: 'column'
  },
  boldText: {
    fontFamily: 'Inter-DisplayBold',
    fontSize: 14
  },
  payTable: {
    flexDirection: 'row'
  },
  screenContainer: {
    marginHorizontal: 15,
    marginTop: 30
  },
  sectionDivider: {
    borderBottomWidth: 1,
    marginVertical: 15
  },
  smallColumn: {
    flex: 1,
    flexDirection: 'column'
  }
})

export default PayslipScreen