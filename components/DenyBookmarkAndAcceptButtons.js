import { View, Pressable, StyleSheet } from 'react-native'
import { acc } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo, Feather, Ionicons } from '@expo/vector-icons'

function DenyBookmarkAndAcceptButton({denyCallback, bookmarkCallback, acceptCallback}) {
  return (
    <View style={styles.denyBookmarkAcceptButtonsContainer}>
      <Pressable style={{width: '30%'}}
        onPress={() => {
          denyCallback()
        }}
      >
        <View style={styles.buttonDeny}>
          <Ionicons name='close-outline' size={70} color='white'/>
        </View>
      </Pressable>

      <Pressable style={{width: '30%'}}
        onPress={() => {
          bookmarkCallback()
        }}
      >
        <View style={styles.buttonBookmark}>
          <Ionicons name='bookmark-outline' size={55} color='white'/>
        </View>
      </Pressable>

      <Pressable style={{width: '30%'}}
        onPress={() => {
          acceptCallback()
        }}
      >
        <View style={styles.buttonAccept}>
          <Feather name='check' size={55} color='white'/>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonAccept: {
    alignItems: 'center',
    backgroundColor: '#13912A',
    borderRadius: 50,
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  buttonBookmark: {
    alignItems: 'center',
    backgroundColor: '#0666DB',
    borderRadius: 50,
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  buttonDeny: {
    alignItems: 'center',
    backgroundColor: '#91041D',
    borderRadius: 50,
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  denyBookmarkAcceptButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: '50%'
  }
})

export default DenyBookmarkAndAcceptButton