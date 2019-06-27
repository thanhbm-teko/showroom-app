import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { screen, colors, fonts, scale } from '../../styles';

export default (SubcategoryItem = ({ item, onPress, isChoose }) => (
  <TouchableOpacity
    style={[
      styles.container,
      isChoose
        ? {
            backgroundColor: colors.brightOrange,
            shadowColor: 'rgba(255,93,23,0.3)',
            shadowOffset: {
              width: 8,
              height: 8
            },
            shadowRadius: 0,
            shadowOpacity: 1,
            elevation: 5
          }
        : {
            backgroundColor: 'white'
          }
    ]}
    onPress={onPress}
  >
    <Text
      numberOfLines={2}
      style={[
        fonts.body1,
        {
          color: isChoose ? 'white' : colors.darkGray
        }
      ]}
    >
      {item.name}
    </Text>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderRadius: scale(4),
    width: scale(100),
    height: scale(52),
    alignItems: 'center',
    marginRight: screen.distance.default,
    padding: screen.distance.default
  }
});
