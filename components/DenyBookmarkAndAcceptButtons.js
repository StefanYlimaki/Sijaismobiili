import { View, Pressable } from 'react-native'
import { acc } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function DenyBookmarkAndAcceptButton({denyCallback, bookmarkCallback, acceptCallback}) {
  return (
    <View style={{
      paddingTop: '60%',
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <Pressable style={{
        width: '30%'
      }}
      onPress={() => {
        denyCallback()
      }}
      >
        <View style={{
          backgroundColor: '#91041D',
          width: 90,
          height: 90,
          borderRadius: 50
        }}>
        </View>
      </Pressable>

      <Pressable style={{
        width: '30%'
      }}
      onPress={() => {
        bookmarkCallback()
      }}
      >
        <View style={{
          backgroundColor: '#0666DB',
          width: 90,
          height: 90,
          borderRadius: 50
        }}>
        </View>
      </Pressable>

      <Pressable style={{
        width: '30%'
      }}
      onPress={() => {
        acceptCallback()
      }}
      >
        <View style={{
          backgroundColor: '#13912A',
          width: 90,
          height: 90,
          borderRadius: 50
        }}>
        </View>
      </Pressable>
    </View>
  )
}

export default DenyBookmarkAndAcceptButton