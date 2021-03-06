import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { colors } from '../../../styles';

export default class Switcher extends React.Component {
  render() {
    let { value } = this.props;
    return (
      <View style={styles.container}>
        <Switch value={value} trackColor={{ true: colors.reddishOrange, false: colors.cloudyBlue }} thumbColor="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
