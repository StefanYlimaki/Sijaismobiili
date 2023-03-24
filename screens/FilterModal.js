import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import * as Colors from '../assets/styles/colors.js'
import DropDownPicker from 'react-native-dropdown-picker'

const FilterModal = ({ substitutions, selectedOrder, selectedShift, search, value, setValue, filterSubstitutions}) => {

  const FILTER_OPTIONS = {
    NEWEST_FIRST: 0,
    BEST_PAID_FIRST: 1,
    CLOSEST_FIRST: 2,
  }

  const SHIFT_OPTIONS = {
    MORNING: 0,
    EVENING: 1,
    NIGHT: 2,
    ALL: 3
  }

  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(parseMunicipalities(substitutions))

  // Takes list of substitutions and returns unique municipalities in the format required by react-native-dropdown-picker
  function parseMunicipalities(subst) {
    const municipalities = subst.map(substitution => substitution.city)
    const uniqueMunicipalities = [...new Set(municipalities)]
    const mappedMunicipalities = uniqueMunicipalities.map(municipality => {
      let item = {
        label: municipality,
        value: municipality
      }
      return item
    })

    return mappedMunicipalities
  }

  return (
    <View style={stylesTest.filterContainer}>
      <Text style={styles.h2}>Järjestys</Text>
      <View style={stylesTest.sortOptionContainer}>
        <Pressable style={selectedOrder === FILTER_OPTIONS.NEWEST_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(FILTER_OPTIONS.NEWEST_FIRST, selectedShift, search)}>
          <Text style={selectedOrder === FILTER_OPTIONS.NEWEST_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Aika</Text>
        </Pressable>
        <Pressable style={selectedOrder === FILTER_OPTIONS.BEST_PAID_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(FILTER_OPTIONS.BEST_PAID_FIRST, selectedShift, search)}>
          <Text style={selectedOrder === FILTER_OPTIONS.BEST_PAID_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Palkka</Text>
        </Pressable>
        <Pressable style={selectedOrder === FILTER_OPTIONS.CLOSEST_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(FILTER_OPTIONS.CLOSEST_FIRST, selectedShift, search)}>
          <Text style={selectedOrder === FILTER_OPTIONS.CLOSEST_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Etäisyys</Text>
        </Pressable>
      </View>

      <Text style={styles.h2}>Vuoro</Text>
      <View style={stylesTest.sortOptionContainer}>
        <Pressable style={selectedShift === SHIFT_OPTIONS.ALL ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.ALL, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.ALL ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Kaikki käy</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.MORNING ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.MORNING, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.MORNING ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Aamu</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.EVENING ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.EVENING, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.EVENING ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Ilta</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.NIGHT ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.NIGHT, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.NIGHT ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Yö</Text>
        </Pressable>
      </View>

      <Text style={styles.h2}>Kunta</Text>
      <DropDownPicker
        multiple={true}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Valitse halutessasi mistä kunnista haluat tuloksia'}
        mode={'BADGE'}
        extendableBadgeContainer={true}
        onClose={() => filterSubstitutions(selectedOrder, selectedShift, search)}
      />
    </View>
  )
}

const stylesTest = StyleSheet.create({
  filterButton: {
    borderColor: Colors.krBlue,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 10,
    minWidth: 80,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  filterButtonActive: {
    backgroundColor: Colors.krGreen,
    borderColor: Colors.krGreen,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 10,
    minWidth: 80,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  filterButtonText: {
    color: Colors.textDark,
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: Colors.textLight,
    textAlign: 'center',
  },
  filterContainer: {
    flex:1,
    margin:15
  },
  sortOptionContainer: {
    flexDirection: 'row',
    marginBottom:20,
    marginTop:15,
  },
})

export default FilterModal