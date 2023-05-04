import React from 'react'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Styles from '../../assets/styles/styles'

const TabBar = ({ state, descriptors, navigation }) => {
//style={Styles.userTabBar}
  return (
    <View style={Styles.userTabBar}>

      <TouchableOpacity
        style={{ height: 50, width: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 15 }}
        onPress={() => { navigation.navigate('MainApplication') }}
        marginRight={10}
        accessibilityRole="button"
        accessibilityLabel="Poistumisnappi"
        accessibilityHint='Johtaa listanäkymään'>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={[Styles.userTab, {alignSelf: 'center', margin: 5}]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index
          const { options } = descriptors[route.key]
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
  
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              testID={options.tabBarTestID}
              accessibilityRole="button"
            >
              <TopTab
                index={index}
                isFocused={isFocused}
                size={24}
                navigation={navigation}
              />
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{ height: 50, width: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginRight: 15 }}/>
    </View>
  )
}

const TopTab = ({ type, size = 24, isFocused, index, navigation }) => {
  switch(index) {
  case 0:
    if(isFocused){
      return(
        <View style={[Styles.userTabItem, Styles.userTabItemActive]}><Text style={Styles.whiteText}>Mieltymykset</Text></View>
      )
    }
    return(<View style={{
      padding: 10,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 5,
      marginRight: 0,

    }}><Text>Mieltymykset</Text></View>)
  case 1:
    if(isFocused){
      return(
        <View style={[Styles.userTabItem, Styles.userTabItemActive]}><Text style={Styles.whiteText}>Omat tiedot</Text></View>
      )
    }
    return(<View style={{
      padding: 10,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 0,
      marginRight: 5,}}><Text>Omat tiedot</Text></View>)
  }
}

export default TabBar