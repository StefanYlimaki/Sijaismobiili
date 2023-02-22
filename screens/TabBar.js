
import { AntDesign } from '@expo/vector-icons'
import { View, Pressable, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'

export const getTopBarStyle = (tabBarHidden) => {
  if(tabBarHidden){
    return {
      display: 'none',
    }
  } else {
    return {
      alignItems: 'center',
      flexDirection: 'row',
      height: 60,
      justifyContent: 'space-around',
    }
  }
}

const TabBar = ({ state, descriptors, navigation, tabBarHidden }) => {
  return (
    <View
      style={getTopBarStyle(tabBarHidden)}>
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
      <View>
        <Pressable onPress={() => { navigation.navigate('UserInfoScreen') }}>
          <AntDesign name="user" size={24} color="black" />
        </Pressable>
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
        <View style={{ backgroundColor: 'grey', padding: 5, borderRadius: 10, marginLeft: 20 }}><Text>Tykätyt</Text></View>
      )
    }
    return(<View style={{ padding: 5, marginLeft: 20 }}><Text>Tykätyt</Text></View>)
  case 1:
    if(isFocused){
      return(
        <View style={{ backgroundColor: 'grey', padding: 5, borderRadius: 10 }}><Text>Sinulle</Text></View>
      )
    }
    return(<View style={{ padding: 5 }}><Text>Sinulle</Text></View>)
  case 2:
    if(isFocused){
      return(
        <View style={{ backgroundColor: 'grey', padding: 5, borderRadius: 10, marginRight: 40 }}><Text>Haku</Text></View>
      )
    }
    return(<View style={{ padding: 5, marginRight: 40 }}><Text>Haku</Text></View>)
  }
}

export default TabBar