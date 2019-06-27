import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { screen, colors, fonts, scale } from '../../styles';
import * as util from '../../util';

const PriceFilterItem = ({ minPrice, maxPrice, onPress }) => {
  if (minPrice <= 0 && maxPrice > 0) {
    return (
      <TouchableOpacity style={commonStyles.filterItemStyle} onPress={onPress}>
        <Text style={[fonts.body1Regular, { color: 'white', paddingRight: screen.distance.tiny }]}>{`Giá: <= ${util.formatPrice(
          maxPrice
        )}`}</Text>
        <Icon type="material-community" name="close" size={scale(16)} color={colors.steel} />
      </TouchableOpacity>
    );
  }

  if (minPrice > 0 && maxPrice <= 0) {
    return (
      <TouchableOpacity style={commonStyles.filterItemStyle} onPress={onPress}>
        <Text style={[fonts.body1Regular, { color: 'white', paddingRight: screen.distance.tiny }]}>{`Giá: >= ${util.formatPrice(
          minPrice
        )}`}</Text>
        <Icon type="material-community" name="close" size={scale(16)} color={colors.steel} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={commonStyles.filterItemStyle} onPress={onPress}>
      <Text style={[fonts.body1Regular, { color: 'white', paddingRight: screen.distance.tiny }]}>
        {`Giá: ${util.formatPrice(minPrice)} - ${util.formatPrice(maxPrice)}`}
      </Text>
      <Icon type="material-community" name="close" size={scale(16)} color={colors.steel} />
    </TouchableOpacity>
  );
};

export default PriceFilterItem;
