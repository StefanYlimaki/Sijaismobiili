import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Styles from '../assets/styles/styles'




const TabBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={{alignSelf: 'center', margin: 15}}>
      <View
        style={Styles.userTab}>
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
    </View>
  )
}

const TopTab = ({ type, size = 24, isFocused, index, navigation }) => {
  navigation.setOptions({ tabBarStyle: { display: 'none' }})
  switch(index) {
  case 0:
    if(isFocused){
      return(
        <View style={[Styles.userTabItem, Styles.userTabItemActive]}><Text style={Styles.whiteText}>Mieltymykset</Text></View>
      )
    }
    return(<View style={{ padding: 10, margin: 5 }}><Text>Mieltymykset</Text></View>)
  case 1:
    if(isFocused){
      return(
        <View style={[Styles.userTabItem, Styles.userTabItemActive]}><Text style={Styles.whiteText}>Omat tiedot</Text></View>
      )
    }
    return(<View style={{ padding: 10, margin: 5 }}><Text>Omat tiedot</Text></View>)
  }
}

export default TabBar