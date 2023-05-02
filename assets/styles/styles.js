import {StyleSheet, Dimensions } from 'react-native'
import { colors } from './colors.js'
const {width: W} = Dimensions.get('window')

const style = StyleSheet.create({

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
  bigButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.krGreen,
    borderRadius: 26,
    borderWidth: 0,
    height: '16%',
    paddingVertical: '5%',
    width: '78%',
  },
  blackText: {
    color: colors.textDark,
    opacity: 0.85,
  },
  buttonText: {
    color: colors.textLight,
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
    backgroundColor: colors.textDark,
    borderRadius: 100,
    height: 35,
    width: 35,
  },
  footer: {
    borderRadius: 150,
    color: colors.krGreen,
    height: '20%',
    top: -85,
    width: W - 100,
  },
  footerButtonText: {
    color: colors.danger,
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
    color: colors.textLight,
    fontFamily: 'Inter-DisplayBold',
    opacity: 0.85,
    paddingRight: 5,
  },
  hourlypayTotal: {
    color: colors.textLight,
    fontFamily: 'Inter-DisplayMedium',
    opacity: 0.85,
  },
  label: {
    color: colors.textDark,
    fontFamily: 'Inter-DisplayExtraBold',
    fontSize: 13,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
  //  textTransform: 'uppercase',
  },
  languageButton: {
    backgroundColor: colors.info,
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
    backgroundColor: colors.warning,
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
    marginHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 30,
    //thumbTintColor : colors.krGreen,
    width: '90%'
  },
  pressedSubstitutionItem: {
    opacity: 0.9,
  },

  removeAccountButton: {
    backgroundColor: colors.danger,
    borderRadius: 100,
    paddingBottom: 5,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5
  },
  removeAccountButtonText: {
    color: colors.textLight,
    fontFamily: 'Inter-DisplayBlack',
    fontSize: 20,
    opacity: 0.85,
    textAlign: 'center'
  },
  settingsButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.blueBright,
    borderRadius: 100,
    marginTop: 20,
    paddingBottom: 8,
    paddingTop: 8,
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
    backgroundColor: colors.krGreen,
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
    color: colors.textLight,
    fontFamily: 'Inter-DisplaySemiBold',
    fontSize: 12,
    marginRight: 15,
    opacity: 0.85,
    textAlign: 'left',
  },
  substItemOrganisationTextDark: {
    color: colors.textDark,
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
    backgroundColor: colors.krBlue,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10
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
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    color: 'white',
    flexDirection: 'column',
    flex:2,
    fontSize: 13
  },
  substitutionCardInfoElement: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 20,
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
    backgroundColor: colors.krBlue,
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
    backgroundColor: colors.krGreen,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    backgroundColor: colors.krGreenLight,
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
    backgroundColor: colors.krBlue,
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
    color: colors.textLight,
    opacity: 0.85,
  },

},

)

export default style