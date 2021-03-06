import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, scale, getLetterSpacing } from '../../../styles';

export default class TextInput extends React.Component {
  render() {
    let { value, placeholder, showKeyboard } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={showKeyboard}>
        <Text style={[styles.text, value ? {} : styles.placeholderText]}>{value || placeholder}</Text>
      </TouchableOpacity>
    );
  }
}

TextInput.defaultProps = {
  value: '',
  placeholder: '',
  showKeyboard: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  },
  placeholderText: {
    color: colors.cloudyBlue
  }
});
