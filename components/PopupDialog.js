import { View, Text, StyleSheet, Pressable , Animated} from 'react-native'
import { Icon } from '@rneui/themed'
import styles from '../assets/styles/styles'
import {BlurView} from 'expo-blur'

function PopupDialog(props) {
  return(
    <BlurView intensity={10} style={ {height: '100%'} }>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={popupStyles.popupContainer}>
          <View style={{
            backgroundColor: props.headerColor,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            flexDirection:'row',
            width: '100%'
          }}>
            <View style={{flex:1}}/>
            <View style={popupStyles.popupHeaderTextContainer}>
              <Text style={popupStyles.popupHeaderText}>{props.headerText}</Text>
            </View>
            <View style={{flex:1, marginTop: 7}}>
              <Pressable onPress={() => {props.navigation.pop(props.popCount? props.popCount : 1)}}>
                <Icon name='close-circle-outline' type="material-community" color={styles.whiteText}/>
              </Pressable>
            </View>
          </View>
          <View style={popupStyles.popupContent}>
            {props.children}
          </View>
        </View>
      </View>
    </BlurView>
  )
}

const popupStyles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: '90%'
  },
  popupContent: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    minHeight: 100,
  },
  popupHeaderText: {
    color: 'white',
    fontFamily: 'Inter-DisplayBlack',
    opacity: 0.8,
    textAlign: 'center'
  },
  popupHeaderTextContainer: {
    flex:8,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop:10,
    minHeight: 50
  }
})

export default PopupDialog