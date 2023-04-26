
import { AntDesign } from '@expo/vector-icons'
import { View, Pressable, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Styles from '../../assets/styles/styles'
import { colors } from '../../assets/styles/colors'


const TabBar = ({ state, descriptors, navigation,  }) => {
  return (
    <View style={{ 
      alignSelf: 'center',
      width: 800,
      height: 800,
      marginLeft: 400,
      overflow: 'hidden', // for hide the not important parts from circle
      height: 100 }}>
      <View style={{ 
        borderRadius: 80, // border borderRadius same as width and height
        width: 400,
        height: 250,
        position: 'absolute',
        bottom: 0, // show the bottom part of circle
        overflow: 'hidden', // hide not important part of image
      }}>
        <View style={{ 
          height: 100, // same width and height for the container
          width: 400,
          position: 'absolute', // position it in circle
          bottom: 0, // position it in circle
        }}>
          <View style={{ display:'flex', flexDirection: 'row', backgroundColor: colors.krGreen }}>
            <View style={{ height: 50, display: 'flex', justifyContent: 'center', paddingLeft: 20}}><Text style={{ fontSize: 20, color: '#fff', fontWeight: '600' }}>LOGO</Text></View>
            <View style={{ height: 50, display: 'flex', justifyContent: 'center', paddingLeft: 10}}><Text style={{ fontSize: 20, color: '#fff' }}>Keikat</Text></View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, height: 50, backgroundColor: colors.krGreen, borderBottomLeftRadius: 800, borderBottomRightRadius: 800, borderBottomWidth: 10, borderBottomColor: colors.krGreen}}>
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
                <AntDesign name="user" size={24} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
        
      </View>
    </View>
  )
}

const TopTab = ({ type, size = 24, isFocused, index, navigation }) => {
  switch(index) {
  case 0:
    if(isFocused){
      return(
        <View style={{  padding: 5, borderRadius: 10, marginLeft: 20 }}><Text style={{ fontFamily: 'Inter-DisplaySemiBold', color: '#fff'}}>Omat keikat</Text></View>
      )
    }
    return(<View style={{ padding: 5, marginLeft: 20 }}><Text style={{ color: '#fff' }}>Omat keikat</Text></View>)
  case 1:
    if(isFocused){
      return(
        <View style={{  padding: 5, borderRadius: 10 }}><Text style={{ fontFamily: 'Inter-DisplaySemiBold', color: '#fff'}}>Sinulle</Text></View>
      )
    }
    return(<View style={{ padding: 5 }}><Text style={{ color: '#fff' }}>Sinulle</Text></View>)
  case 2:
    if(isFocused){
      return(
        <View style={{  padding: 5, borderRadius: 10, marginRight: 40 }}><Text style={{ fontFamily: 'Inter-DisplaySemiBold', color: '#fff'}}>Haku</Text></View>
      )
    }
    return(<View style={{ padding: 5, marginRight: 40 }}><Text style={{ color: '#fff' }}>Haku</Text></View>)
  }
}

export default TabBar