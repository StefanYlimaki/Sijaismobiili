import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import styles from '../assets/styles/styles'
import { colors } from '../assets/styles/colors'
import DropDownPicker from 'react-native-dropdown-picker'

const FilterModal = ({ substitutions, selectedOrder, showSavedOnly, selectedShift, search, value, setValue, filterSubstitutions }) => {

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
      <Pressable style={showSavedOnly ? stylesTest.filterButtonActive : stylesTest.filterButton}
        accessibilityRole='button'
        accessibilityLabel="Näytä vain tallennetut"
        onPress={() =>
          filterSubstitutions(selectedOrder, selectedShift,
            !showSavedOnly,
            search)
        }>
        <Text style={showSavedOnly ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Näytä vain tallennetut</Text>
      </Pressable>
      <Text style={styles.h2}>Järjestys</Text>
      <View style={stylesTest.sortOptionContainer}>
        <Pressable style={selectedOrder === FILTER_OPTIONS.NEWEST_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Aika"
          accessibilityHint='Järjestää keikat ajankohdan mukaan'
          onPress={() => filterSubstitutions(FILTER_OPTIONS.NEWEST_FIRST, selectedShift, showSavedOnly, search)}>
          <Text style={selectedOrder === FILTER_OPTIONS.NEWEST_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Aika</Text>
        </Pressable>
        <Pressable style={selectedOrder === FILTER_OPTIONS.BEST_PAID_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Palkka"
          accessibilityHint='Järjestää keikat palkan mukaan'
          onPress={() => filterSubstitutions(FILTER_OPTIONS.BEST_PAID_FIRST, selectedShift, showSavedOnly, search)}>
          <Text style={selectedOrder === FILTER_OPTIONS.BEST_PAID_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Palkka</Text>
        </Pressable>
        <Pressable style={selectedOrder === FILTER_OPTIONS.CLOSEST_FIRST ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Etäisyys"
          accessibilityHint='Järjestää keikat etäisyyden mukaan'
          onPress={() => filterSubstitutions(FILTER_OPTIONS.CLOSEST_FIRST, selectedShift, showSavedOnly, search)}>
          <Text style={selectedOrder === FILTER_OPTIONS.CLOSEST_FIRST ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Etäisyys</Text>
        </Pressable>
      </View>

      <Text style={styles.h2}>Vuoro</Text>
      <View style={stylesTest.sortOptionContainer}>
        <Pressable style={selectedShift === SHIFT_OPTIONS.ALL ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Kaikki käy"
          accessibilityHint='Näyttää kaikkia vuoroja'
          onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.ALL, showSavedOnly, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.ALL ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Kaikki käy</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.MORNING ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Aamu"
          accessibilityHint='Näyttää aamuvuoroja'
          onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.MORNING, showSavedOnly, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.MORNING ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Aamu</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.EVENING ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Ilta"
          accessibilityHint='Näyttää iltavuoroja'
          onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.EVENING, showSavedOnly, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.EVENING ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Ilta</Text>
        </Pressable>
        <Pressable style={selectedShift === SHIFT_OPTIONS.NIGHT ? stylesTest.filterButtonActive : stylesTest.filterButton}
          accessibilityRole='button'
          accessibilityLabel="Yö"
          accessibilityHint='Näyttää yövuoroja'
          onPress={() => filterSubstitutions(selectedOrder, SHIFT_OPTIONS.NIGHT, showSavedOnly, search)}>
          <Text style={selectedShift === SHIFT_OPTIONS.NIGHT ? stylesTest.filterButtonTextActive : stylesTest.filterButtonText}>Yö</Text>
        </Pressable>
      </View>

      <Text style={styles.h2}>Kunta</Text>
      <DropDownPicker
        accessibilityRole='spinbutton'
        accessibilityLabel="Valitse halutessasi mistä kunnista haluat tuloksia"
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
        onClose={() => filterSubstitutions(selectedOrder, selectedShift, showSavedOnly, search)}
      />
    </View>
  )
}

const stylesTest = StyleSheet.create({
  filterButton: {
    borderColor: colors.krBlue,
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
    backgroundColor: colors.krGreen,
    borderColor: colors.krGreen,
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
    color: colors.textDark,
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: colors.textLight,
    textAlign: 'center',
  },
  filterContainer: {
    flex: 1,
    margin: 15
  },
  sortOptionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 15,
  },
})

export default FilterModal