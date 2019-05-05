import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { Sizes } from '../../styles/sizes';
import { scale } from '../../styles/scale';

export default class HeaderIcon extends PureComponent {
  render() {
    const { name, type, size, color, accessibilityLabel, onPress, style } = this.props;

    return (
      <TouchableOpacity style={[styles.iconPlaceholder, style]} accessibilityLabel={accessibilityLabel} onPress={onPress}>
        <Icon type={type} name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }
}

HeaderIcon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number
};

HeaderIcon.defaultProps = {
  type: 'material',
  name: 'chevron-left',
  color: 'white',
  accessibilityLabel: '',
  onPress: () => null,
  size: Sizes.iconSize.default
};

const styles = StyleSheet.create({
  iconPlaceholder: {
    backgroundColor: 'transparent',
    height: '100%',
    width: scale(44),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
