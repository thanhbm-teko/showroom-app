import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import * as util from '../../../util';
import { fonts, screen, colors, scale } from '../../../styles';

export default class Gift extends PureComponent {
  render() {
    let { benefit } = this.props;
    let gift = benefit.product;

    return (
      <View style={styles.benefitDetail}>
        <View style={[styles.info, { flexDirection: 'column', alignItems: 'flex-start' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon type="font-awesome" name="gift" size={scale(16)} color={colors.orangeRed} />
            <Text style={[fonts.subheading, { color: colors.darkGreyBlue, marginLeft: scale(6) }]} numberOfLines={2}>
              [{gift.sku}] {gift.name} <Text style={styles.price}>{util.formatPrice(gift.price)}</Text>
            </Text>
          </View>
          <View style={{ paddingLeft: scale(22) }}>
            {gift ? (
              <Text style={[fonts.subheading, styles.stock]}>
                {`Tồn kho: 0/0`}
                {' - '}
                {`BH: ${gift.warranty ? gift.warranty : 0}`}
              </Text>
            ) : null}
            {benefit.promotionQuantity.remainQuantity > 0 || benefit.promotionQuantity.remainQuantity === 0 ? (
              <Text style={styles.note}>{`Số lượng KM còn lại: ${benefit.promotionQuantity.remainQuantity}`}</Text>
            ) : null}
          </View>
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
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  price: {
    color: colors.brightOrange
  },
  stock: {
    color: colors.clearBlue,
    fontFamily: 'sale-text-regular'
  },
  note: {
    fontSize: screen.fontSize.smaller,
    fontStyle: 'italic',
    color: '#e60000'
  }
});
