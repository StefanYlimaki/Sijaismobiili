import { StyleSheet } from 'react-native'
import * as Colors from './colors.js'

export default StyleSheet.create({

  blackText: {
    color: Colors.textDark,
    opacity: 0.8,
  },
  container: {
    flex: 1,
    fontFamily: 'Inter-Display'
  },
  h1: {
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 40,
  },
  h2: {
    fontFamily: 'Inter-DisplayBlack',
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
    textTransform: 'uppercase'
  },
  input: {
    backgroundColor: '#efefef',
    borderBottomColor: Colors.krGreen,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    padding: 10,
  },
  inputlist: {
    paddingHorizontal: '5%',
  },
  label: {
    color: Colors.krGreenDark,
    fontFamily: 'Inter-DisplayExtraBold',
    fontSize: 12,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    textTransform: 'uppercase',
  },
  pageContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  prefSlider: {
    paddingBottom: 20,
    paddingTop: 20,
    thumbTintColor : Colors.krGreen,
    width: '100%',
  },
  pressedSubstitutionItem: {
    opacity: 0.5,
  },
  sliderList: {
    alignItems: 'baseline'
  },
  substitutionContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  substitutionElement: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  substitutionItemBenefitsItem: {
    backgroundColor: Colors.krBlue,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    marginBottom: 2,
    padding: 4
  },
  substitutionItemContainer: {
    marginTop: 20,
    width: '100%',
  },
  substitutionPreviewComponent: {
    borderRadius: 20,
    color: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  substitutionPreviewComponentBottomElement: {
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingVertical: 8
  },
  substitutionPreviewComponentTopElement: {
    backgroundColor: Colors.krGreen,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },  
  substitutionsListContainer: {
    height: '100%',
    marginHorizontal: 16,
  },   tag: {
    backgroundColor: Colors.krGreenLight,
    borderRadius: 24,
    width: 'auto',
  },
  textfieldlist: {
    fontFamily: 'Inter-DisplaySemiBold',
    paddingBottom: '2%',
    paddingTop: '5%'
  },
  userContainer: {
    flex: 1,
  },
  userContent: {
    paddingHorizontal: '5%',
  },
  userIcon: undefined,
  whiteText: {
    color: Colors.textLight,
    opacity: 0.8,
  }
},
)