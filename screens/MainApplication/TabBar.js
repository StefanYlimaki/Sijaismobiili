
import { AntDesign } from '@expo/vector-icons'
import { View, Pressable, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Styles from '../../assets/styles/styles'
import { colors } from '../../assets/styles/colors'


const TabBar = ({ state, descriptors, navigation, }) => {
  return (
    <View>
      <View style={styles.containerStyle} />
      <View style={{ display:'flex', flexDirection: 'row', backgroundColor: colors.krGreen, position: 'absolute', flex: 1}}>
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingLeft: 20}}><Text style={{ fontSize: 20, color: '#fff', fontWeight: '600' }}>LOGO</Text></View>
        <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingLeft: 10}}><Text style={{ fontSize: 20, color: '#fff' }}>Keikat</Text></View>

        <View style={{ alignItems: 'flex-end', flex: 1, flexDirection: 'column' }}>
          <Pressable 
            accessibilityRole="button"
            accessibilityLabel="Oma profiili"
            onPress={() => { navigation.navigate('UserInfoScreen') }}>
            <View style={{ height: 50, width: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginRight: 15 }}>
              <AntDesign name="user" size={24} color="white" />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50, position: 'absolute', marginTop: 50, width: window.width }}>
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
      </View>
    </View>
  )
}

const window = Dimensions.get('window')

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.krGreen,
    height: 105,
  }
})

const TopTab = ({ type, size = 24, isFocused, index, navigation }) => {
  switch (index) {
  case 0:
    if (isFocused) {
      return (
        <View style={{ padding: 5, borderRadius: 10, marginLeft: 20 }}><Text style={{ fontFamily: 'Inter-DisplaySemiBold', color: '#fff' }}>Omat keikat</Text></View>
      )
    }
    return (<View style={{ padding: 5, marginLeft: 20 }}><Text style={{ color: '#fff' }}>Omat keikat</Text></View>)
  case 1:
    if (isFocused) {
      return (
        <View style={{ padding: 5, borderRadius: 10 }}><Text style={{ fontFamily: 'Inter-DisplaySemiBold', color: '#fff' }}>Sinulle</Text></View>
      )
    }
    return (<View style={{ padding: 5 }}><Text style={{ color: '#fff' }}>Sinulle</Text></View>)
  case 2:
    if (isFocused) {
      return (
        <View style={{ padding: 5, borderRadius: 10, marginRight: 40 }}><Text style={{ fontFamily: 'Inter-DisplaySemiBold', color: '#fff' }}>Haku</Text></View>
      )
    }
    return (<View style={{ padding: 5, marginRight: 40 }}><Text style={{ color: '#fff' }}>Haku</Text></View>)
  }
}

export default TabBar