import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DraggableFlatList, { NestableDraggableFlatList, OpacityDecorator } from 'react-native-draggable-flatlist'
import { colors } from '../assets/styles/colors'
import { Icon } from '@rneui/themed'

function OrderPreferences({preferenceOrder, setPreferenceOrder}) {

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <OpacityDecorator>
        <TouchableOpacity
          onPressIn={drag}
          disabled={isActive}
          style={ prefStyles.listItem }
        >
          <View style={{flex: 1}}>
            <Icon name='reorder-horizontal' type="material-community" color={colors.textDark}/>
          </View>
          <View style={{flex: 6}}>
            <Text>{item.label}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <Text>{item.index + 1}.</Text>
          </View>
        </TouchableOpacity>
      </OpacityDecorator>
    )
  }

  return (
    <View style={prefStyles.orderPreferencesContainer}>
      <NestableDraggableFlatList
        data={preferenceOrder}
        onDragEnd={({ data }) => setPreferenceOrder(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  )
}

const prefStyles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10
  },
  orderPreferencesContainer: {
    backgroundColor: colors.krGray,
    borderRadius: 10,
    marginBottom: 60,
    padding: 20
  }
})

export default OrderPreferences