import { View, Pressable, StyleSheet } from 'react-native'
import { acc } from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { colors } from '../assets/styles/colors'

function DenyBookmarkAndAcceptButton({ denyCallback, bookmarkCallback, acceptCallback }) {
  return (
    <View style={styles.denyBookmarkAcceptButtonsContainer}>
      <Pressable style={{ width: '30%' }}
        accessibilityRole="button"
        accessibilityLabel="Hylkää keikka"
        accessibilityHint='Hylkää pyyhkäisemällä vasemmalle'
        onPress={() => {
          denyCallback()
        }}
      >
        <View style={styles.buttonDeny}>
          <Feather name='x' size={45} color='white' />
        </View>
      </Pressable>

      <Pressable style={{ width: '30%' }}
        accessibilityRole="button"
        accessibilityLabel="Tallenna muistilistaan"
        accessibilityHint='Paina tallentaaksesi muistilistaan'
        onPress={() => {
          bookmarkCallback()
        }}
      >
        <View style={styles.buttonBookmark}>
          <Feather name='bookmark' size={45} color='white' />
        </View>
      </Pressable>

      <Pressable style={{ width: '30%' }}
        accessibilityRole="button"
        accessibilityLabel="Hyväksy keikka"
        accessibilityHint='Hyväksy pyyhkäisemällä oikealle'
        onPress={() => {
          acceptCallback()
        }}
      >
        <View style={styles.buttonAccept}>
          <Feather name='check' size={45} color='white' />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonAccept: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.success,
    borderRadius: 50,
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  buttonBookmark: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.info,
    borderRadius: 50,
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  buttonDeny: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.danger,
    borderRadius: 50,
    height: 90,
    justifyContent: 'center',
    width: 90
  },
  denyBookmarkAcceptButtonsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 50,
    paddingTop: 50,
    width: '90%'

  }
})

export default DenyBookmarkAndAcceptButton