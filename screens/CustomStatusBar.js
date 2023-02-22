import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const CustomStatusBar = (
  {
    backgroundColor,
    barStyle = 'light-content',
    //add more props StatusBar
  }
) => { 
       
  const insets = useSafeAreaInsets()
  
  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle} />
    </View>
  )
}

export default CustomStatusBar