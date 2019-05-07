import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors, scale, getLetterSpacing } from '../../styles';

export default class SectionTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: scale(13),
    paddingVertical: scale(8),
    marginTop: scale(10)
  },
  text: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(13),
    letterSpacing: getLetterSpacing(-0.08),
    lineHeight: scale(18),
    textAlignVertical: 'center',
    color: colors.steel
  }
});
