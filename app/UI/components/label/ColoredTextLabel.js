import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

import { fonts, colors, scale } from '../../styles';

const labelStylesConfigs = {
  normal: {
    text: { color: colors.darkGray },
    container: { backgroundColor: colors.paleGrey, borderColor: 'rgba(23,127,255,0.2)' }
  },
  success: {
    text: { color: colors.clearBlue },
    container: { backgroundColor: colors.iceBlue, borderColor: 'rgba(23,127,255,0.2)' }
  },
  error: {
    text: { color: colors.primary },
    container: { backgroundColor: '#ffefed' }
  },
  info: {
    text: { color: colors.frogGreen },
    container: { backgroundColor: '#e1f8de', borderColor: 'rgba(83,195,5,0.2)' }
  },
  orange: {
    text: { color: colors.pumpkinOrange },
    container: { backgroundColor: colors.veryLightPinkTwo, borderColor: colors.pumpkinOrangeblur }
  },
  quantity: {
    text: { color: colors.steel },
    container: { backgroundColor: 'white', borderColor: colors.paleLilac }
  }
};

/**
 * @augments {Component<{  text:string,  type:oneOf(['normal', 'success', 'error', 'info'])>}
 */
class ColoredTextLabel extends PureComponent {
  render() {
    const { text, type, style, textStyle } = this.props;
    const labelStyle = labelStylesConfigs[type] || labelStylesConfigs['normal'];

    return (
      <View style={[styles.container, labelStyle.container, style]}>
        <Text style={[fonts.caption, labelStyle.text, textStyle]}>{text}</Text>
      </View>
    );
  }
}

export default ColoredTextLabel;

ColoredTextLabel.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(['normal', 'success', 'error', 'info', 'orange', 'quantity']),
  style: PropTypes.any,
  textStyle: PropTypes.any
};

ColoredTextLabel.defaultProps = {
  text: '',
  type: 'normal'
};

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    borderWidth: 0.5
  }
});
