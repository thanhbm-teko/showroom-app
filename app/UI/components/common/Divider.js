import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { screen, colors } from '../../styles';

export class Divider extends PureComponent {
  render() {
    const { style } = this.props;

    return <View style={[styles.divider, style]} />;
  }
}

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 0,
    width: '100%',
    borderBottomColor: colors.paleLilac,
    borderBottomWidth: screen.borderWidth
  }
});
