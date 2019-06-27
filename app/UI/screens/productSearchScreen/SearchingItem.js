import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { fonts, screen, colors, scale } from '../../styles';

import * as util from '../../util';
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
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View>
          <View style={styles.row}>
            {this.renderName()}
            {this.renderPrice()}
          </View>
          {this.renderLowerRow()}
        </View>
      </TouchableOpacity>
    );
  }

  renderName() {
    let { item } = this.props;
    let hasGifts = true;

    return (
      <View style={styles.leftInfo}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {hasGifts ? (
            <View style={{ position: 'absolute' }}>
              <Icon type="ionicon" name="ios-gift" color="#e60000" size={scale(15)} />
            </View>
          ) : null}
          <Text style={fonts.heading1} numberOfLines={3}>
            {`${hasGifts ? '     ' : ''}${item.name}`}
          </Text>
        </View>
      </View>
    );
  }

  renderPrice() {
    let { item } = this.props;
    let hasPromoPrice = true;

    return (
      <View style={styles.rightInfo}>
        <View style={styles.rightInfo}>
          {hasPromoPrice ? <Text style={fonts.original_price}>{util.formatPrice(item.price)}</Text> : null}
          <Text style={fonts.price}>{util.formatPrice(item.price)}</Text>
        </View>
      </View>
    );
  }

  renderLowerRow() {
    let { item } = this.props;
    let currentStoreStock = 1;
    let totalStock = 10;

    return (
      <View style={{ flexDirection: 'row', marginTop: screen.distance.smaller }}>
        <ColoredTextLabel text={`#${item.sku}`} type="success" />
        <ColoredTextLabel style={{ marginLeft: scale(8) }} text={`Trạng thái: ${item.status}`} type="info" />
        <View style={{ flex: 1 }} />
        <ColoredTextLabel
          text={currentStoreStock > 0 ? `${currentStoreStock} / ${totalStock}` : 'xem chi tiết'}
          type="normal"
        />
      </View>
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
  }
});
