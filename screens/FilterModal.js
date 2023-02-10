import React, { useState } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

const FilterModal = ({setSubstList, substitutions}) => {

  const FILTER_OPTIONS = {
    NEWEST_FIRST: 0,
    BEST_PAID_FIRST: 1
  }

  const [filterOptions, setFilterOptions] = useState({order: -1, shift: 'all'})

  const FilterSubstitutions = () => {
    let filtered = [...substitutions]

    if (filterOptions.order === FILTER_OPTIONS.NEWEST_FIRST) {
      filtered.sort((a, b) => { return a.date.localeCompare(b.date) })
    } else if (filterOptions.order === FILTER_OPTIONS.BEST_PAID_FIRST) {
      filtered.sort((a, b) => { return b.hourlyPay - a.hourlyPay })
    }
    setSubstList(filtered)
  }

  return (
    <View style={styles.filterContainer}>
      <Text>Järjestys</Text>
      <View style={styles.sortOptionContainer}>
        <Button 
          title="Uusimmat"
          onPress={() => setFilterOptions( { order:FILTER_OPTIONS.NEWEST_FIRST, shift:filterOptions.shift } )}
        />
        <Button 
          title="Paras palkka"
          onPress={() => setFilterOptions( { order:FILTER_OPTIONS.BEST_PAID_FIRST, shift:filterOptions.shift } )}
        />
        <Button 
          title="Lähimmät"
          onPress={() => setFilterOptions( { order:FILTER_OPTIONS.NEWEST_FIRST, shift:filterOptions.shift } )}
        />
      </View>

      <Button 
        title="Suodata"
        onPress={() => FilterSubstitutions() }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    flex:1,
    margin:15
  },
  sortOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:40,
    marginTop:15,
  },
})

export default FilterModal