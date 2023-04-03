import { StyleSheet, Dimensions } from 'react-native'
import * as Colors from './colors.js'

const {width: W} = Dimensions.get('window')

export default StyleSheet.create({

  agenda: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    paddingHorizontal: '6%',
    paddingVertical: 8,
  },
  bgimage: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
  },

  blackText: {
    color: Colors.textDark,
    opacity: 0.85,
  },
  buttonText: {
    color: Colors.textLight,
    fontFamily: 'Inter-DisplaySemiBold',
  },
  calendar:{
    borderColor: 'transparent',
    borderWidth: 1,
    height: '50%',
  },
  container: {
    flex: 1,
    fontFamily: 'Inter-Display'
  },
  currentDistance:{
    paddingBottom: 10,
    textAlign: 'center',
  },
  distanceSlider:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exitButton: {
    backgroundColor: Colors.textDark,
    borderRadius: 100,
    height: 35,
    width: 35,
  },
  footer: {
    borderRadius: 150,
    color: Colors.krGreen,
    height: '20%',
    top: -85,
    width: W - 100,
  },
  footerButtonText: {
    color: Colors.danger,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  footerSettings: {
    alignItems: 'center',
    marginTop: 30
  },
  h1: {
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 35,
    textAlign: 'center',
  },
  h2: {
    fontFamily: 'Inter-DisplayBlack',
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
    // textTransform: 'uppercase',
  },
  h2AndInfoButton:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hourlypay: {
    color: Colors.textLight,
    fontFamily: 'Inter-DisplayBold',
    opacity: 0.85,
    paddingRight: 5,
  },
  hourlypayTotal: {
    color: Colors.textLight,
    fontFamily: 'Inter-DisplayMedium',
    opacity: 0.85,
  },
  label: {
    color: Colors.textDark,
    fontFamily: 'Inter-DisplayExtraBold',
    fontSize: 13,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
  //  textTransform: 'uppercase',
  },
  languageButton: {
    backgroundColor: Colors.info,
    borderRadius: 7,
    marginBottom: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 5,
    width: 120
  },
  languageButtonDisabled: {
    backgroundColor: '#D9D9D9',
    borderRadius: 7,
    marginBottom: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 5,
    width: 120
  },
  languageButtonsContainer: {
    marginTop: 20
  },
  linkText: {
    marginBottom: 2,
    textDecorationLine: 'underline'
  },
  listItemContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 5,
  },
  logOutButton: {
    backgroundColor: Colors.warning,
    borderRadius: 100,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5
  },
  pageContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  

  prefSlider: {
    paddingBottom: 30,
    paddingTop: 30,
    //thumbTintColor : Colors.krGreen,
    width: '100%'
  },
  pressedSubstitutionItem: {
    opacity: 0.9,
  },
  recommendationCardAnimated: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    resizeMode: 'cover',
  },
  recommendationCardInfoBarElement: {
    backgroundColor: Colors.krBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10
  },
  recommendationCardInfoBarLeftElement: {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 13
  },
  recommendationCardInfoBarRightElement: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 13
  },
  recommendationCardInfoElement: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: '25%'
  },
  recommendationCardSalaryElement: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    padding: 10
  },
  removeAccountButton: {
    backgroundColor: Colors.danger,
    borderRadius: 100,
    paddingBottom: 5,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5
  },
  removeAccountButtonText: {
    color: Colors.textLight,
    fontFamily: 'Inter-DisplayBlack',
    fontSize: 20,
    opacity: 0.85,
    textAlign: 'center'
  },
  settingsButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.info,
    borderRadius: 100,
    marginBottom: 50,
    paddingBottom: 5,
    paddingTop: 5,
    width: 120
  },
  settingsContainer: {
    flex: 4
  },
  settingsFooter : {
    alignItems: 'center',
    flex: 1,
  },
  settingsScreen: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  singleSettingContainer: {
    paddingTop: 20
  },
  singleSubstitutionBenefitsContainer: {
    alignSelf: 'flex-start',
    flexWrap:'wrap', 
    fontFamily: 'Inter-DisplaySemiBold',
  },
  singleSubstitutionContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: 32
  },
  singleSubstitutionInfoContainer: {
    backgroundColor: Colors.krGreen,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: '6%',
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    width: '100%'
  },
  singleSubstitutionTopElement: {
    flexDirection: 'row', 
    marginTop: '20%', 
    paddingHorizontal: 16, 
    width: '100%'
  },
  sliderList: {
    alignItems: 'baseline',
    paddingBottom: 40,
    paddingTop: 30,
  },
  substItemOrganisationText: {
    color: Colors.textLight,
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 12,
    opacity: 0.85,
    textAlign: 'right',
  }, 
  substitutionCardAnimated: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    resizeMode: 'cover',
  },
  substitutionCardInfoBar: {
    backgroundColor: Colors.krBlue,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    padding: 10,
    paddingHorizontal: '10%'
  },
  substitutionCardInfoBarLeftElement: {
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 13
  },
  substitutionCardInfoBarRighBotElement: {
    alignSelf: 'flex-end',
    color: 'white',
    fontSize: 13
  },
  substitutionCardInfoBarRightTopElement: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    color: 'white',
    flexDirection: 'column',
    flex:2,
    fontSize: 13
  },
  substitutionCardInfoElement: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '15%',
    paddingLeft: 10,
    paddingTop: '10%'
  },
  substitutionCardSalaryItem: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    padding: 10
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
  substitutionHeroItemContainer: {
    elevation: 17,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    width: '100%',
  },
  substitutionHeroPreviewComponentBottomElement: {
    flexDirection: 'column',
    minHeight: 250,
    paddingBottom: 16,
    paddingLeft: 16,
    width: '100%',
  },
  substitutionItemBenefitsItem: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.krBlue,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    marginVertical: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  substitutionItemContainer: {
    elevation: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },shadowOpacity: 0.34,
    shadowRadius: 6.27,
    width: '100%',
  },
  substitutionPreviewComponent: {
    borderRadius: 10,
    color: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  substitutionPreviewComponentBottomElement: {
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingVertical: 8
  },
  substitutionPreviewComponentTopElement: {
    backgroundColor: Colors.krGreen,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    minHeight: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  substitutionsListContainer: {
    height: '100%',
    paddingBottom: 10
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    rowGap: 50
  },
  tabActiveText: {
    fontFamily: 'Inter-DisplaySemiBold',
  },
  tag: {
    backgroundColor: Colors.krGreenLight,
    borderRadius: 24,
    width: 'auto',
  },
  textfieldlist: {
    align: 'left',
    backgroundColor : 'transparent',
    fontFamily: 'Inter-DisplaySemiBold',
    textAlign: 'left',
  },
  thumb: {
    elevation: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 7,
      bottom: 20,
      right: 20,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
  },
  userContainer: {
    flex: 1,
  },
  userContent: {
    paddingHorizontal: '5%',
  },
  userIcon: undefined,
  userInfoList: {
    alignSelf: 'center',
    backgroundColor: 'rgba(136,136,136,0.1)',
    borderRadius: 20,
    marginVertical: 20,
    width: '100%',
  },
  userTab: {
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    borderRadius: 1000,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  userTabBar: {
    alignItems: 'center',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: -900,
  },
  userTabItem: {
    borderRadius: 1000,
    margin: 5,
    padding: 10,
  },
  userTabItemActive: {
    backgroundColor: Colors.krBlue,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  whiteText: {
    color: Colors.textLight,
    opacity: 0.85,
  }

},

)