import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../../styles/colors';
import { scale, getLetterSpacing } from '../../styles/scale';

export default class CheckboxRow extends React.Component {
  render() {
    let { title, bottomSeparator, value } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons
            name={value ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={scale(20)}
            color={value ? Colors.reddishOrange : Colors.cloudyBlue}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.text}>{title}</Text>
          </View>
          {bottomSeparator ? <View style={styles.bottomSeparator} /> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(14)
  },
  content: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14)
  },
  bottomSeparator: {
    height: 1,
    backgroundColor: Colors.paleGrey
  },
  text: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  }
});
