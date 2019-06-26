import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { screen, colors, fonts, scale } from '../../styles';
import * as util from '../../util';

import ColoredTextLabel from '../../components/label/ColoredTextLabel';
import ChangeQuantityItem from '../../components/common/ChangeQuantityItem';
import PromotionSummary from './PromotionSummary';

export class ProductInCart extends Component {
  state = {
    recentQuantity: 0
  };

  renderPrice = () => {
    let { product, discount } = this.props.item;

    return (
      <View style={styles.priceContainer}>
        {discount > 0 ? (
          <Text style={[fonts.subheading, { textDecorationLine: 'line-through', marginLeft: screen.distance.default }]}>
            {util.formatPrice(product.price)}
          </Text>
        ) : null}
        <Text style={[fonts.heading1, { color: colors.brightOrange }]}>{util.formatPrice(product.price - discount)}</Text>
      </View>
    );
  };

  renderProductInfo = () => {
    let { item } = this.props;
    let { product } = item;
    return (
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.container} onPress={this.goToDetail}>
          <View style={{ flex: 1 }}>
            <View style={{ padding: screen.distance.smaller, paddingBottom: 0 }}>
              <Text style={[fonts.heading1, { flex: 1 }]}>{product.name}</Text>
            </View>
            <View style={styles.infoLabel}>
              <ColoredTextLabel text={`#${product.sku}`} type="success" />
              <ColoredTextLabel text={`BH ${product.warranty || 0} tháng`} type="orange" style={{ marginLeft: scale(4) }} />
            </View>
          </View>
          {this.renderPrice()}
        </TouchableOpacity>
        <PromotionSummary promotions={item.promotions} />
        <View style={styles.border} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
          <TouchableOpacity style={styles.removeButton} onPress={() => {}}>
            <Icon type="ionicon" name="md-trash" size={scale(24)} color={colors.cloudyBlue} />
            <Text style={[fonts.subheading, { marginLeft: scale(7), color: colors.steel }]}>Xoá</Text>
          </TouchableOpacity>
          <ChangeQuantityItem
            quantity={item.quantity}
            maxQuantity={999}
            onFocus={() => this.onFocus(item.quantity)}
            onUpdateQuantity={this.onEndEditing}
            style={{ margin: screen.distance.smaller, marginLeft: screen.distance.small }}
          />
        </View>
      </View>
    );
  };

  renderProductHasNoInfo() {
    return (
      <View style={styles.noInfoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.textStyle, { flex: 1 }]}>Không có thông tin sản phẩm</Text>
          <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'flex-start' }} onPress={() => {}}>
            <Icon type="material-community" name="close" size={scale(25)} color={colors.lightBlueGrey} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    let { product } = this.props.item;
    if (!product) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else if (isEmpty(product)) {
      return this.renderProductHasNoInfo();
    } else {
      return this.renderProductInfo();
    }
  }
}

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInCart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingBottom: scale(12)
  },
  border: {
    borderColor: colors.paleLilac,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  infoContainer: {
    marginTop: scale(10),
    borderColor: colors.paleLilac,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  },
  noInfoContainer: {
    backgroundColor: '#ffffff',
    padding: screen.padding.default,
    marginBottom: screen.margin.default
  },
  textStyle: {
    fontSize: screen.fontSize.default,
    fontWeight: '600',
    textAlignVertical: 'bottom'
  },
  priceContainer: {
    alignItems: 'flex-end',
    padding: screen.distance.smaller,
    paddingLeft: screen.distance.small
  },
  infoLabel: {
    flexDirection: 'row',
    marginTop: screen.distance.default,
    paddingHorizontal: screen.distance.smaller
  },
  removeButton: {
    marginLeft: screen.distance.smaller,
    marginVertical: scale(14),
    flexDirection: 'row',
    alignItems: 'center'
  }
});
