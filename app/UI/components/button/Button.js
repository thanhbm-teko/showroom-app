import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { fonts, screen, colors, scale } from '../../styles';

const Button = ({
  onPress,
  title,
  disabled,
  color,
  iconName,
  iconType,
  iconSize,
  iconColor,
  containerStyle,
  textStyle,
  badge
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, containerStyle, { backgroundColor: color }]}
    disabled={disabled}
  >
    {iconName ? (
      <Icon
        type={iconType}
        name={iconName}
        size={iconSize}
        style={styles.icon}
        color={disabled ? colors.cloudyBlue : iconColor}
      />
    ) : null}
    <Text style={[fonts.heading1, styles.title, { color: disabled ? colors.cloudyBlue : 'white' }, textStyle]}>{title}</Text>
    {badge ? (
      <Text
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'red',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'white',
          fontSize: scale(10)
        }}
      >
        {badge}
      </Text>
    ) : null}
  </TouchableOpacity>
);

export default Button;
Button.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  onPress: PropTypes.func
};

Button.defaultProps = {
  iconType: 'material-community',
  iconSize: scale(24),
  color: 'white',
  iconColor: 'white',
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
  }
});
