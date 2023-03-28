import { View, Pressable, StyleSheet } from 'react-native'
import { acc } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import {danger, info, success} from '../assets/styles/colors'

function DenyBookmarkAndAcceptButton({denyCallback, bookmarkCallback, acceptCallback}) {
  return (
    <View style={styles.denyBookmarkAcceptButtonsContainer}>
      <Pressable style={{width: '30%'}}
        onPress={() => {
          denyCallback()
        }}
      >
        <View style={styles.buttonDeny}>
          <Feather name='x' size={45} color='white'/>
        </View>
      </Pressable>

      <Pressable style={{width: '30%'}}
        onPress={() => {
          bookmarkCallback()
        }}
      >
        <View style={styles.buttonBookmark}>
          <Feather name='bookmark' size={45} color='white'/>
        </View>
      </Pressable>

      <Pressable style={{width: '30%'}}
        onPress={() => {
          acceptCallback()
        }}
      >
        <View style={styles.buttonAccept}>
          <Feather name='check' size={45} color='white'/>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonAccept: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: success,
    borderRadius: '50%',
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  buttonBookmark: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: info,
    borderRadius: '50%',
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  buttonDeny: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: danger,
    borderRadius: '50%',
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  denyBookmarkAcceptButtonsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '50%',
    width: '90%'
  }
})

export default DenyBookmarkAndAcceptButton