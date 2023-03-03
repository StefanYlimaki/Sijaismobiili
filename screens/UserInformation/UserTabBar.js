import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Styles from '../../assets/styles/styles'

export const getTopBarStyle = (userTabBarHidden) => {
  if(userTabBarHidden){
    return {
      display: 'none',
    }
  } else {
    return {
      alignItems: 'center',
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: -900,
    }
  }
}

const TabBar = ({ state, descriptors, navigation, userTabBarHidden }) => {

  //style={Styles.userTabBar}
  return (
    <View style={getTopBarStyle(userTabBarHidden)}>
      <View style={[Styles.userTab, {alignSelf: 'center', margin: 45}]}>
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
      <TouchableOpacity
        style={{alignSelf: 'flex-end'}}
        onPress={() => { navigation.navigate('all') }}
        marginRight={10}
        accessibilityRole="button"
        accessibilityLabel="Poistumisnappi"
        accessibilityHint='Johtaa listanäkymään'>
        <AntDesign name="closecircleo" size={24} />
      </TouchableOpacity>
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