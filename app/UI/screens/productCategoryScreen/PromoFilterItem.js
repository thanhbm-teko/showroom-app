import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { screen, scale, fonts } from '../../styles';

const PromoFilterItem = ({ onPress }) => {
  return (
    <TouchableOpacity style={commonStyles.filterItemStyle} onPress={onPress}>
      <Text style={[fonts.body1Regular, { color: 'white', paddingRight: screen.distance.tiny }]}>Có khuyến mãi</Text>
      <Icon type="material-community" name="close" size={scale(16)} color={'white'} />
    </TouchableOpacity>
  );
};

export default PromoFilterItem;
