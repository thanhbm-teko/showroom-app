import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors, scale, getLetterSpacing } from '../../../styles';

export default class InputRow extends React.Component {
  render() {
    let { title, bottomSeparator, inputComponent } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.title}>
            <Text style={styles.text}>{title}</Text>
          </View>
          {inputComponent}
        </View>
        {bottomSeparator ? <View style={styles.bottomSeparator} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: scale(14),
    paddingHorizontal: scale(12)
  },
  title: {
    minWidth: scale(150)
  },
  value: {
    flex: 1
  },
  bottomSeparator: {
    height: 1,
    backgroundColor: colors.paleGrey,
    paddingLeft: scale(12)
  },
  text: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: colors.darkGreyBlue
  }
});
