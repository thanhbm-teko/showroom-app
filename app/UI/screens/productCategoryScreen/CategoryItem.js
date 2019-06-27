import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { screen, colors, fonts, scale } from '../../styles';

const CategoryItem = ({ item, onPress, isChoose }) => (
  <TouchableOpacity
    style={[
      styles.container,
      {
        borderBottomWidth: isChoose ? scale(2) : 0
      }
    ]}
    onPress={onPress}
  >
    <Text style={[fonts.body1Regular, { color: isChoose ? colors.reddishOrange : colors.darkGreyBlue }]}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: scale(52),
    borderBottomColor: colors.brightOrange,
    paddingHorizontal: screen.distance.default
  }
});

export default CategoryItem;
