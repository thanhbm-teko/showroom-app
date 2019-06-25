import { StyleSheet, Platform } from 'react-native';
import { scale } from './scaling';
import { screen } from './screen';
import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  full: {
    flex: 1
  },
  fullAndCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 8
  },
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: { height: 0 },
    shadowRadius: 0,
    elevation: 0,
    backgroundColor: '#16A085',
    height: Platform.OS === 'ios' ? scale(64) : scale(64),
    paddingTop: screen.header.statusBarHeight,
    justifyContent: 'center'
  },
  borderButton: {
    backgroundColor: '#005ca4',
    padding: screen.padding.default,
    borderRadius: screen.padding.default
  },
  filterItemStyle: {
    borderRadius: scale(8),
    flexDirection: 'row',
    paddingHorizontal: screen.distance.default,
    paddingVertical: scale(4),
    marginLeft: screen.distance.default,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: colors.steel,
    borderWidth: 0.5,
    marginBottom: screen.distance.default
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5
      },
      android: {
        elevation: 3
      }
    })
  }
});
