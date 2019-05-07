import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { fonts, screen, colors, scale } from '../../styles';

import Util from '../../../core/util/index.ts';
import ColoredTextLabel from '../../components/label/ColoredTextLabel';

export default class SearchingItem extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item.sku !== nextProps.item.sku) {
      return true;
    }
    return false;
  }

  onPress = () => {
    let { index, item, onPress } = this.props;
    onPress && onPress(item, index);
  };

  render() {
    let { item } = this.props;
    let hasPromoPrice = true;
    let hasGifts = true;
    let currentStoreStock = 1;
    let totalStock = 10;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View>
          <View style={styles.row}>
            <View style={styles.leftInfo}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {hasGifts ? (
                  <View style={{ position: 'absolute' }}>
                    <Icon type="font-awesome" name="gift" color="#e60000" size={scale(15)} />
                  </View>
                ) : null}
                <Text style={fonts.body1} numberOfLines={3}>
                  {hasGifts ? '     ' : ''}
                  {item.name}
                </Text>
              </View>
            </View>
            <View style={styles.rightInfo}>
              <View style={styles.rightInfo}>
                {hasPromoPrice ? <Text style={styles.priceTextOriginal}>{Util.String.formatPrice(item.price)}</Text> : null}
                <Text style={styles.priceText}>{Util.String.formatPrice(item.price)}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: screen.distance.smaller }}>
            <ColoredTextLabel text={`#${item.sku}`} type="success" />
            <View style={{ marginLeft: scale(8) }}>
              <ColoredTextLabel text={`Trạng thái: ${item.status}`} type="info" />
            </View>
            <View style={{ flex: 1 }} />
            <ColoredTextLabel
              text={currentStoreStock > 0 ? `${currentStoreStock} / ${totalStock}` : 'xem chi tiết'}
              type="normal"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    padding: screen.padding.default
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  leftInfo: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  rightInfo: {
    flex: 1.2,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  infoText: {
    fontSize: screen.commonRatio.fontSize
  },
  priceText: {
    fontSize: scale(17),
    color: colors.brightOrange,
    fontFamily: 'sale-text-semibold',
    textAlign: 'right'
  },
  priceTextOriginal: {
    fontSize: screen.commonRatio.fontSize,
    //fontWeight: '600',
    color: 'gray',
    textAlign: 'right',
    textDecorationLine: 'line-through'
  }
});
