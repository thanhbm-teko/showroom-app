import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { fonts, screen, colors, scale } from '../../styles';

export default (Button = ({ onPress, title, disabled, color, icon, containerStyle, textStyle, badge }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, containerStyle, { backgroundColor: color }]}
    disabled={disabled}
  >
    {icon ? (
      <Icon
        type={icon.type}
        name={icon.name}
        size={icon.size}
        style={styles.icon}
        color={disabled ? colors.cloudyBlue : icon.color}
      />
    ) : null}
    <Text style={[fonts.heading1, styles.title, { color: disabled ? colors.cloudyBlue : 'white' }, textStyle]}>{title}</Text>
    {badge ? <Text style={styles.badge}>{badge}</Text> : null}
  </TouchableOpacity>
));

Button.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.object
};

Button.defaultProps = {
  iconType: {
    type: 'material-community',
    size: scale(24),
    color: 'white'
  },
  color: 'white',
  containerStyle: {}
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(14)
  },
  icon: {
    marginLeft: screen.margin.default,
    marginRight: screen.margin.default
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginLeft: screen.distance.default,
    marginRight: screen.distance.default
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: scale(10)
  }
});
