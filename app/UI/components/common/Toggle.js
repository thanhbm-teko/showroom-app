import React, { PureComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Switch from 'react-native-switch-pro';

import { screen, fonts, colors, scale, common } from '../../styles';

const Toggle = ({ title, value, onToggle, ...restProps }) => (
  <View style={styles.container}>
    <Text style={[fonts.body1, common.full]}>{title}</Text>
    <Switch {...restProps} width={32} height={20} value={value} onSyncPress={onToggle} backgroundActive={colors.brightOrange} />
  </View>
);

export default Toggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(48),
    padding: screen.distance.smaller
  }
});
