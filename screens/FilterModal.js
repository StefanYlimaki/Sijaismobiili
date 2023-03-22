import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import * as Colors from '../assets/styles/colors.js'
import calculateDistance from '../utils/calculateDistance'
import DropDownPicker from 'react-native-dropdown-picker'

const FilterModal = ({setSubstList, substitutions}) => {

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

  const [selectedOrder, setSelectedOrder] = useState(FILTER_OPTIONS.NEWEST_FIRST)
  const [selectedShift, setSelectedShift] = useState(SHIFT_OPTIONS.ALL)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([])
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

  // Sets the filtering state and filters substitutions
  const FilterSubstitutions = (sortOption, shiftOption) => {
    setSelectedOrder(sortOption)
    setSelectedShift(shiftOption)

    let filtered = [...substitutions]

    // Filtering by city / municipality
    if (value.length !== 0) {
      filtered = filtered.filter(subst => {
        for (const item of value) {
          if (item === subst.city) {
            return true
          }
        }
        return false
      })
    }
    
    // How shifts are determined while filtering (starting times) /  TODO: Do the times make sense? 
    // morning shift: 06:00 - 13:59
    // evening shift: 14:00 - 21:59
    // night shift:   22:00 - 05:59

    // Filtering by shift
    switch (shiftOption) {
    case SHIFT_OPTIONS.ALL:
      break
    case SHIFT_OPTIONS.MORNING:
      filtered = filtered.filter(subst => {
        const start = new Date(subst.timing.startTime)
        let startLimit = new Date(start)
        startLimit.setHours(6)
        startLimit.setMinutes(0)
        let endLimit = new Date(start)
        endLimit.setHours(13)
        endLimit.setMinutes(59)
        return start >= startLimit && start <= endLimit
      })
      break
    case SHIFT_OPTIONS.EVENING:
      filtered = filtered.filter(subst => {
        const start = new Date(subst.timing.startTime)
        let startLimit = new Date(start)
        startLimit.setHours(14)
        startLimit.setMinutes(0)
        let endLimit = new Date(start)
        endLimit.setHours(21)
        endLimit.setMinutes(59)
        return start >= startLimit && start <= endLimit
      })
      break
    case SHIFT_OPTIONS.NIGHT:
      filtered = filtered.filter(subst => {
        const start = new Date(subst.timing.startTime)
        let startLimit = new Date(start)
        startLimit.setHours(22)
        startLimit.setMinutes(0)
        let endLimit = new Date(start)
        endLimit.setDate(endLimit.getDate() + 1)
        endLimit.setHours(5)
        endLimit.setMinutes(59)
        return start >= startLimit && start <= endLimit
      })
      break
    }

    // Sorting the substitution
    switch (sortOption) {
    case FILTER_OPTIONS.NEWEST_FIRST:
      filtered.sort((a, b) => { return a.date.localeCompare(b.date) })
      break
    case FILTER_OPTIONS.BEST_PAID_FIRST:
      filtered.sort((a, b) => { return b.hourlyPay - a.hourlyPay })
      break
    case FILTER_OPTIONS.CLOSEST_FIRST:
      filtered.sort((a, b) => {
        return calculateDistance(parseFloat(a.coordinates.latitude), parseFloat(a.coordinates.longitude), 65.05941, 25.46642, true)
            - calculateDistance(parseFloat(b.coordinates.latitude), parseFloat(b.coordinates.longitude), 65.05941, 25.46642, true)
      })
      break
    }
    setSubstList(filtered)
  }

  return (
    <View style={stylesTest.filterContainer}>
      <Text style={styles.h2}>Järjestys</Text>
      <View style={stylesTest.sortOptionContainer}>
        <Pressable style={selectedOrder === FILTER_OPTIONS.NEWEST_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(FILTER_OPTIONS.NEWEST_FIRST, selectedShift)}>
          <Text style={selectedOrder === FILTER_OPTIONS.NEWEST_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Aika</Text>
        </Pressable>
        <Pressable style={selectedOrder === FILTER_OPTIONS.BEST_PAID_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(FILTER_OPTIONS.BEST_PAID_FIRST, selectedShift)}>
          <Text style={selectedOrder === FILTER_OPTIONS.BEST_PAID_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Palkka</Text>
        </Pressable>
        <Pressable style={selectedOrder === FILTER_OPTIONS.CLOSEST_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(FILTER_OPTIONS.CLOSEST_FIRST, selectedShift)}>
          <Text style={selectedOrder === FILTER_OPTIONS.CLOSEST_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Etäisyys</Text>
        </Pressable>
      </View>

      <Text style={styles.h2}>Vuoro</Text>
      <View style={stylesTest.sortOptionContainer}>
        <Pressable style={selectedShift === SHIFT_OPTIONS.ALL ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(selectedOrder, SHIFT_OPTIONS.ALL)}>
          <Text style={selectedShift === SHIFT_OPTIONS.ALL ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Kaikki käy</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.MORNING ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(selectedOrder, SHIFT_OPTIONS.MORNING)}>
          <Text style={selectedShift === SHIFT_OPTIONS.MORNING ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Aamu</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.EVENING ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(selectedOrder, SHIFT_OPTIONS.EVENING)}>
          <Text style={selectedShift === SHIFT_OPTIONS.EVENING ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Ilta</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.NIGHT ? stylesTest.filterButtonActive : stylesTest.filterButton} onPress={() => FilterSubstitutions(selectedOrder, SHIFT_OPTIONS.NIGHT)}>
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
        onClose={() => FilterSubstitutions(selectedOrder, selectedShift)}
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