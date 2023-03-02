import { View, Pressable } from 'react-native'
import { acc } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from '../assets/styles/styles'

function DenyBookmarkAndAcceptButton({denyCallback, bookmarkCallback, acceptCallback}) {
  return (
    <View style={styles.denyBookmarkAcceptButtonsContainer}>
      <Pressable style={{width: '30%'}}
        onPress={() => {
          denyCallback()
        }}
      >
        <View style={styles.buttonDeny}>
        </View>
      </Pressable>

      <Pressable style={{width: '30%'}}
        onPress={() => {
          bookmarkCallback()
        }}
      >
        <View style={styles.buttonBookmark}>
        </View>
      </Pressable>

      <Pressable style={{width: '30%'}}
        onPress={() => {
          acceptCallback()
        }}
      >
        <View style={styles.buttonAccept}>
        </View>
      </Pressable>
    </View>
  )
}

export default DenyBookmarkAndAcceptButton