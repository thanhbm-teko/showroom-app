import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { scale, getLetterSpacing } from './Scale';

export const Fonts = StyleSheet.create({
  fontGigantic: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(60),
    letterSpacing: getLetterSpacing(-3),
    color: Colors.brightOrange
  },
  fontBig: {
    fontFamily: 'sale-text-bold',
    fontSize: scale(24),
    letterSpacing: getLetterSpacing(-0.6),
    lineHeight: scale(32),
    color: Colors.black
  },
  medium: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(20),
    letterSpacing: getLetterSpacing(-0.8),
    lineHeight: scale(22),
    color: Colors.darkGray
  },
  heading1: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.4),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  },
  typeFace: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.4),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  },
  heading2: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(17),
    letterSpacing: getLetterSpacing(-0.41),
    lineHeight: scale(22),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  },
  subheading: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.1),
    lineHeight: scale(18),
    textAlignVertical: 'center',
    color: Colors.darkGray
  },
  body1: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  },
  body1Regular: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  },
  original_price: {
    textDecorationLine: 'line-through',
    fontFamily: 'sale-text-regular',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.2),
    lineHeight: scale(18),
    textAlignVertical: 'center',
    color: Colors.steel
  },
  body2: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(14),
    letterSpacing: getLetterSpacing(-0.2),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(19),
    color: Colors.black
  },
  body3: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(14),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: Colors.darkGray
  },
  body3_mg_top: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(14),
    marginTop: scale(15),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: Colors.darkGray
  },
  botton_1: {
    letterSpacing: getLetterSpacing(-0.24),
    borderRadius: scale(8),
    fontSize: scale(15),
    marginVertical: scale(11),
    marginHorizontal: scale(12),
    paddingVertical: scale(14),
    paddingHorizontal: scale(30.5),
    fontFamily: 'sale-text-semibold'
  },
  body4: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.41),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(20),
    color: Colors.darkGreyBlue
  },
  body5: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(14),
    marginTop: scale(2),
    letterSpacing: getLetterSpacing(-0.08),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(18)
  },
  body6: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(20),
    letterSpacing: getLetterSpacing(-0.24),
    textAlignVertical: 'center',
    color: Colors.steel
  },
  footnote: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(16),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: Colors.darkGray
  },
  footnoteRed: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(16),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: Colors.brightOrange
  },
  display: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(17),
    letterSpacing: getLetterSpacing(-0.41),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(22),
    color: Colors.darkGreyBlue
  },
  caption: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.08),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(18),
    color: Colors.gray
  },
  medium11: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(11),
    lineHeight: scale(18),
    letterSpacing: getLetterSpacing(-0.2),
    color: Colors.brightOrange
  }
});
