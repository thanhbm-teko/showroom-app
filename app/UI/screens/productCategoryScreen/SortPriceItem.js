import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { screen, scale, fonts } from '../../styles';

export default (SortPriceItem = ({ onPress, sort }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[fonts.body1, { color: 'white' }]}>Giá {sort === 'increase' ? 'tăng dần' : 'giảm dần'}</Text>
      <Icon type="material-community" name="close" size={scale(16)} color={'white'} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(8),
    flexDirection: 'row',
    paddingHorizontal: screen.distance.default,
    marginLeft: screen.distance.default,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: colors.darkGray,
    borderWidth: 1,
    marginVertical: scale(4)
  }
});
