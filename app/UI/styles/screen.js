import { Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';
import { scale } from './scaling';

const { width, height } = Dimensions.get('window');
const softBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height;
const statusBarHeight = Constants.statusBarHeight;
const headerHeight = Platform.OS === 'ios' ? scale(44) : scale(56);
const base_resolution = Platform.OS === 'ios' ? 375 : 360; // screen width of iphone 6 - Nexus 5X
const real_resolution = width;

const distance = {
  tiny: scale(5),
  default: scale(8),
  smaller: scale(12),
  small: scale(16),
  medium: scale(24),
  large: scale(32)
};

export const screen = {
  width,
  height,
  softBarHeight,
  isSmallDevice: width < 375,
  isLandscape: width > height,
  s15: scale(15),
  s20: scale(15),
  distance,
  padding: distance,
  margin: distance,
  button: {
    height: scale(44)
  },
  iconSize: {
    small: scale(15),
    medium: scale(20),
    default: scale(29),
    large: scale(35)
  },
  fontSize: {
    default: scale(12),
    tiny: scale(8),
    verySmall: scale(10),
    small: scale(12),
    medium: scale(14),
    large: scale(16),
    larger: scale(17),
    veryLarge: scale(22)
  },
  commonRatio: {
    buttonHeight: height * 0.06,
    titleFontSize: height * 0.06,
    smallFontSize: height * 0.02,
    mediumFontSize: height * 0.025,
    fontSize: height * 0.03,
    iconSize: height * 0.04,
    smallIconSize: height * 0.03,
    largeIconSize: height * 0.05
  },
  header: {
    statusBarHeight: statusBarHeight,
    headerHeight: headerHeight,
    totalHeight: headerHeight + statusBarHeight,
    titleWidth: width - 2 * headerHeight - 80,
    iconSize: Platform.OS === 'ios' ? scale(22) : scale(22),
    smallIconSize: Platform.OS === 'ios' ? scale(15) : scale(15),
    textSize: Platform.OS === 'ios' ? scale(17) : scale(17)
  },
  searchBar: {
    height: Platform.OS === 'ios' ? scale(48) : scale(48),
    fontSize: Platform.OS === 'ios' ? scale(15) : scale(15)
  },
  tabBar: {
    height: Platform.OS === 'ios' ? scale(49) : scale(49),
    labelFontSize: Platform.OS === 'ios' ? scale(11) : scale(13),
    labelIconSize: Platform.OS === 'ios' ? scale(29) : scale(29)
  },
  dimension: {
    emptyCartImageHeight: width / 3,
    imageSizeInSearch: scale(50)
  },
  fontScale: real_resolution / base_resolution
};
