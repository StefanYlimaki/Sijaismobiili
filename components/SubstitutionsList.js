import { View, FlatList, Text, StyleSheet } from 'react-native'

import SubstitutionItem from './SubstitutionItem'

const SubstitutionsList = ({ navigation }) => {
  const substitutions = [
    {
      id: 1,
      title: 'Keittiöapulainen / Tarjoilija',
      description:
        'Salaatin teko, tiskaus, astioiden nouto ja paikoilleen vienti. Kuumennuskeittiö. Lounaalla syöjiä 450.',
      organisation: 'Kouluravintola Palmia',
      location: 'Kauppakuja 1, 00100 Helsinki',
      timing: 'LA 18.2. klo 9:15-15.30',
      hourlyPay: '15€/h',
      contactInfo: 'palmia@kouluravintola.fi',
    },
    {
      id: 2,
      title: 'Myymäläavustaja',
      description:
        'Tuotteiden paikalleen laittoa, inventaariota, tavaroiden järjestelyä, kassalla oloa.',
      organisation: 'K-Kauppa Esko',
      location: 'Järvitie 5, 90100 Oulu',
      timing: 'PE 24.2 klo 7.45-16.15',
      hourlyPay: '14€/h',
      contactInfo: 'esko@k-kauppa.fi',
    },
  ]

  return (
    <View style={styles.substitutionsListContainer}>
      <FlatList
        data={substitutions}
        renderItem={(substitution) => {
          return (
            <SubstitutionItem
              substitution={substitution}
              navigation={navigation}
            />
          )
        }}
        keyExtractor={(substitution, index) => {
          return substitution.id
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  substitutionsListContainer: {
    paddingTop: 64,
    marginHorizontal: 32,
    height: '100%',
  },
})

export default SubstitutionsList
