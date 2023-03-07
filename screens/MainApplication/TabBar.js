
import { AntDesign } from '@expo/vector-icons'
import { View, Pressable, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import Styles from '../../assets/styles/styles'


const TabBar = ({ state, descriptors, navigation,  }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50}}>
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
            style={{ display: 'flex' }}
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
      <Pressable onPress={() => { navigation.navigate('UserInfoScreen') }}>
        <View style={{ height: 50, width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AntDesign name="user" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  )
}

const TopTab = ({ type, size = 24, isFocused, index, navigation }) => {
  switch(index) {
  case 0:
    if(isFocused){
      return(
        <View style={{  padding: 5, borderRadius: 10, marginLeft: 20 }}><Text style={Styles.tabActiveText}>Tykätyt</Text></View>
      )
    }
    return(<View style={{ padding: 5, marginLeft: 20 }}><Text>Tykätyt</Text></View>)
  case 1:
    if(isFocused){
      return(
        <View style={{  padding: 5, borderRadius: 10 }}><Text style={Styles.tabActiveText}>Sinulle</Text></View>
      )
    }
    return(<View style={{ padding: 5 }}><Text>Sinulle</Text></View>)
  case 2:
    if(isFocused){
      return(
        <View style={{  padding: 5, borderRadius: 10, marginRight: 40 }}><Text style={Styles.tabActiveText}>Haku</Text></View>
      )
    }
    return(<View style={{ padding: 5, marginRight: 40 }}><Text>Haku</Text></View>)
  }
}

export default TabBar