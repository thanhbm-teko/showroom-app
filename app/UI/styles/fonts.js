import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { scale, getLetterSpacing } from './scaling';

export const fonts = StyleSheet.create({
  fontGigantic: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(60),
    letterSpacing: getLetterSpacing(-3),
    color: colors.brightOrange
  },
  fontBig: {
    fontFamily: 'sale-text-bold',
    fontSize: scale(24),
    letterSpacing: getLetterSpacing(-0.6),
    lineHeight: scale(32),
    color: colors.black
  },
  medium: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(20),
    letterSpacing: getLetterSpacing(-0.8),
    lineHeight: scale(22),
    color: colors.darkGray
  },
  heading1: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.4),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  typeFace: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.4),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  heading2: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(17),
    letterSpacing: getLetterSpacing(-0.41),
    lineHeight: scale(22),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  subheading: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.1),
    lineHeight: scale(18),
    textAlignVertical: 'center',
    color: colors.darkGray
  },
  body1: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  body1Regular: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  original_price: {
    textDecorationLine: 'line-through',
    fontFamily: 'sale-text-regular',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.2),
    lineHeight: scale(18),
    textAlignVertical: 'center',
    color: colors.steel
  },
  price: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.2),
    lineHeight: scale(18),
    textAlignVertical: 'center',
    color: colors.brightOrange
  },
  body2: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(14),
    letterSpacing: getLetterSpacing(-0.2),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(19),
    color: colors.black
  },
  body3: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(14),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: colors.darkGray
  },
  body3_mg_top: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(14),
    marginTop: scale(15),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: colors.darkGray
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
    color: colors.darkGreyBlue
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
    color: colors.steel
  },
  footnote: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(16),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: colors.darkGray
  },
  footnoteRed: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(12),
    lineHeight: scale(16),
    letterSpacing: getLetterSpacing(-0.1),
    textAlignVertical: 'center',
    color: colors.brightOrange
  },
  display: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(17),
    letterSpacing: getLetterSpacing(-0.41),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(22),
    color: colors.darkGreyBlue
  },
  caption: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.08),
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: scale(18),
    color: colors.gray
  },
  medium11: {
    fontFamily: 'sale-text-medium',
    fontSize: scale(11),
    lineHeight: scale(18),
    letterSpacing: getLetterSpacing(-0.2),
    color: colors.brightOrange
  }
});
