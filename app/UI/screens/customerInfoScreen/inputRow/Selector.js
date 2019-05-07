import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { colors, scale, getLetterSpacing } from '../../../styles';

export default class Selector extends React.Component {
  render() {
    let { value } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>{value}</Text>
        <View style={styles.icon}>
          <FontAwesome name="chevron-right" size={scale(14)} color={colors.cloudyBlue} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    flex: 1,
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
