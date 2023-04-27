import { View, Button, StyleSheet, Pressable } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { Text } from 'react-native'
import { SearchBar } from '@rneui/base'
import { Icon } from '@rneui/themed'
import * as Colors from '../../assets/styles/colors'
import { getUserData } from '../../utils'

import calculateDistance from '../../utils/calculateDistance'
import SubstitutionsList from '../../components/SubstitutionsList'
import substitutions from '../../assets/data/substitutionsData_new.json'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import FilterModal from '../FilterModal'

const AllSubstitutions = ({ navigation, route }) => {

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

  const [substList, setSubstList] = useState(substitutions)
  const [selectedOrder, setSelectedOrder] = useState(FILTER_OPTIONS.NEWEST_FIRST)
  const [selectedShift, setSelectedShift] = useState(SHIFT_OPTIONS.ALL)
  const [showSavedOnly, setOnlySaved] = useState(false)
  const [savedSubstitutionIds, setIds] = useState(null)
  const [value, setValue] = useState([])

  const BottomSheetModalRef = useRef(null)
  const snapPoints = ['58%']

  const [search, setSearch] = useState('')

  useState(() => {
    const retrieveData = async () => {
      const userData = await getUserData()

      //Filter accepted substitutions to unique ids
      const uniqueSubstitutions = userData.savedSubstitutions.filter(
        (value, index, array) => array.indexOf(value) === index
      )

      //Filter all substitutions to ones that match the id
      setIds(uniqueSubstitutions)
    }
    retrieveData()
  }, [])

  //Run when route params are updated
  useEffect(() => {
    if (route.params?.showSavedOnly) {
      setOnlySaved(true)
      filterSubstitutions(selectedOrder, selectedShift, true, search)
    }
  }, [route.params])

  
  //If route params have been set, change state and reset params
  /*
  if (route.params?.showSavedOnly && !showSavedOnly) {
    setOnlySaved(true)
    route.params.showSavedOnly = false
    console.log(showSavedOnly)
    filterSubstitutions(selectedOrder, selectedShift, true, search)
  }
  */

  const updateSearch = (search) => {
    setSearch(search)
    filterSubstitutions(selectedOrder, selectedShift, showSavedOnly, search)
  }

  const filterSubstitutions = (sortOption, shiftOption, showSavedOption, search) => {
    setSelectedOrder(sortOption)
    setSelectedShift(shiftOption)
    setOnlySaved(showSavedOption)

    let filtered = [...substitutions]

    // Filtering by search
    filtered = filtered.filter(subst => {
      let searchableFields = subst.city + subst.department + subst.title + subst.description + subst.organisation
      if (searchableFields.toLowerCase().includes(search.toLowerCase())) {
        return true
      } else {
        return false
      }
    })

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

    // Filter by saved only, if showSavedOnly value is true
    if (showSavedOption) {
      filtered = filtered.filter(subst => {
        if (savedSubstitutionIds.includes(subst.id)) {
          return true
        } else {
          return false
        }
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

  if (savedSubstitutionIds) {
    return (
      <BottomSheetModalProvider>
        <View>
          <View style={searchStyles.searchHeader}>
            <View style={{flex: 9, justifyContent: 'center'}}>
              <SearchBar
                placeholder='Hae sijaisuuksia'
                onChangeText={updateSearch}
                value={search}
                containerStyle={searchStyles.searchContainer}
                inputContainerStyle={searchStyles.inputContainer}
                lightTheme={true}
                round={true}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'center', marginRight: 15}}>
              <Pressable onPress={() => BottomSheetModalRef.current?.present()}>
                <Icon name='tune-variant' type="material-community" size={27} color={Colors.textDark}/>
              </Pressable>
            </View>
          </View>
          <View style={{ height: '95%' }}>
            <SubstitutionsList navigation={navigation} substitutions={substList} />
          </View>
          <BottomSheetModal ref={BottomSheetModalRef} index={0} snapPoints={snapPoints}>
            <FilterModal
              substitutions={substitutions}
              selectedOrder={selectedOrder}
              selectedShift={selectedShift}
              showSavedOnly={showSavedOnly}
              search={search}
              value={value}
              setValue={setValue}
              filterSubstitutions={filterSubstitutions}
            />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    )
  } else {
    <View>
      <Text>Loading...</Text>
    </View>
  }
}

const searchStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F6F6F6',
    borderWidth: 0
  },
  searchContainer: {
    backgroundColor: '#FFF',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 15
  },
  searchHeader: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 65
  }
})

export default AllSubstitutions