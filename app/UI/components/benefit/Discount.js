import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import * as util from '../../util';
import { fonts, screen, colors, scale } from '../../styles';

export default class Discount extends PureComponent {
  render() {
    let { value } = this.props;

    return (
      <View style={styles.benefitDetail}>
        <Icon type="font-awesome" name="tag" size={scale(16)} color={colors.orangeRed} />
        <View style={styles.info}>
          <Text style={[fonts.subheading, { color: colors.darkGreyBlue }]}>
            {'Giảm giá '}
            {value ? <Text style={styles.price}>{util.formatPrice(value)}</Text> : null}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  benefitDetail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screen.distance.default
  },
  info: {
    flex: 1,
    marginLeft: scale(6),
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  description: {
    fontSize: screen.fontSize.smaller,
    fontStyle: 'italic',
    color: '#e60000'
  }
});
