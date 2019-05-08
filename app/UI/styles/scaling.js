import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375; // iphone 6
const guidelineBaseHeight = 680;

export const scale = size => Math.floor((width / guidelineBaseWidth) * size);
export const verticalScale = size => Math.floor((height / guidelineBaseHeight) * size);
export const moderateScale = (size, factor = 0.5) => Math.floor(size + (scale(size) - size) * factor);
export const getLetterSpacing = value => (Platform.OS === 'ios' ? value : 0);
