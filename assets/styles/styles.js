import { StyleSheet } from 'react-native'
import * as Colors from './colors.js'
export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.cherry,
  },
  substitutionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 32,
    alignItems: 'center',
  },
  substitutionElement: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  substitutionItemContainer: {
    width: '100%',
    marginTop: 20,
  },
  substitutionPreviewComponent: {
    flex: 1,
    flexDirection: 'column',
    color: 'white',
    borderRadius: 20
  },
  substitutionPreviewComponentTopElement: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.krGreen,
    height: 50,
  },
  substitutionPreviewComponentBottomElement: {
    paddingLeft: 16,
    paddingVertical: 8,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#D9D9D9',
    paddingBottom: 16
  },
  substitutionItemBenefitsItem: {
    backgroundColor: Colors.krBlue,
    color: '#FFFFFF',
    padding: 4,
    marginBottom: 2,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  pressedSubstitutionItem: {
    opacity: 0.5,
  },
  whiteText: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
      blackText: {
    color: '#000000',
    opacity: 0.8,
  },

}
)