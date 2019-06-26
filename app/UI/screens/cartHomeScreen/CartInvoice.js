import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text, Keyboard } from 'react-native';

import { screen, colors, fonts } from '../../styles';
import * as util from '../../util';

export default class CartInvoice extends React.Component {
  render() {
    let invoiceWithoutPromotion = 1000000;
    let totalCartDiscount = 100000;
    let voucherDiscount = 50000;
    let invoice = 850000;
    let useVoucherLater = false;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} activeOpacity={1.0}>
        <View style={styles.container}>
          <View style={styles.priceRow}>
            <Text style={[fonts.body1Regular]}>Tổng tiền:</Text>
            <Text style={fonts.body1Regular}>{util.formatPrice(invoiceWithoutPromotion)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[fonts.body1Regular, { color: colors.clearBlue }]}>Giảm giá / Ưu đãi:</Text>
            <Text style={[fonts.body1Regular, { color: colors.clearBlue }]}>
              {util.formatPrice(totalCartDiscount)}
              {' / '}
              {useVoucherLater ? '(dùng sau)' : util.formatPrice(voucherDiscount)}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[fonts.body1, { color: colors.brightOrange }]}>
              {voucherDiscount > 0 ? 'Còn phải thu:' : 'Thành tiền:'}
            </Text>
            <Text style={[fonts.heading1, { color: colors.brightOrange }]}>{util.formatPrice(invoice)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomColor: colors.paleLilac,
    borderBottomWidth: 0.5,
    padding: screen.distance.smaller
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
