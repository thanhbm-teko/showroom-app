import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import { scale } from '../../styles/scale';

const labelStylesConfigs = {
  normal: {
    text: { color: Colors.darkGray },
    container: { backgroundColor: Colors.paleGrey, borderColor: 'rgba(23,127,255,0.2)' }
  },
  success: {
    text: { color: Colors.clearBlue },
    container: { backgroundColor: Colors.iceBlue, borderColor: 'rgba(23,127,255,0.2)' }
  },
  error: {
    text: { color: Colors.primary },
    container: { backgroundColor: '#ffefed' }
  },
  info: {
    text: { color: Colors.frogGreen },
    container: { backgroundColor: '#e1f8de', borderColor: 'rgba(83,195,5,0.2)' }
  },
  orange: {
    text: { color: Colors.pumpkinOrange },
    container: { backgroundColor: Colors.veryLightPinkTwo, borderColor: Colors.pumpkinOrangeblur }
  },
  quantity: {
    text: { color: Colors.steel },
    container: { backgroundColor: 'white', borderColor: Colors.paleLilac }
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
        <Text style={[Fonts.caption, labelStyle.text, textStyle]}>{text}</Text>
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
