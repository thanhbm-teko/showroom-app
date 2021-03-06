import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as useCaseCore from '../../../core/useCase/productDetail/productDetail.ts';
import { getPromotionApplyResult } from '../../../core/useCase/choosePromotionForProduct/choosePromotion.ts';

import Button from '../../components/button/Button';
import ImageWrapper from '../../components/ImageWrapper';
import ColoredTextLabel from '../../components/label/ColoredTextLabel';
import ProductPromotionChooser from './ProductPromotionChooser';
import ProductTypeChooser from './ProductTypeChooser';
import ProductSpecTable from './ProductSpecTable';
import StockInfo from './StockInfo';

import { fonts, screen, colors, scale } from '../../styles';
import * as productDetailActions from '../../reduxConnector/productDetail/actions';
import * as cartActions from '../../reduxConnector/cart/actions';
import * as util from '../../util';
import * as navUtil from '../../util/navigation';

import PRODUCT_TYPES from './productTypes.json';
import PROMOTIONS from './promotions.json';

export class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    let { sku } = this.props.navigation.state.params;
    this.props.fetchProductDetail(sku);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  onBackPressed = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  render() {
    let { product } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderTopPanel()}
          {this.renderProductGeneralInfo()}
          <View>
            <ProductTypeChooser productTypes={PRODUCT_TYPES} selectedProductType={'Biz'} />
            {this.renderPriceSection()}
            <StockInfo stocks={util.safeValue(product, 'stocks', [])} isUsingOm={false} />
          </View>
          <ProductPromotionChooser promotions={PROMOTIONS} />
          <ProductSpecTable
            description={util.safeValue(product, 'description')}
            specifications={util.safeValue(product, 'attributes', [])}
            isLoading={false}
          />
        </ScrollView>
      </View>
    );
  }

  renderTopPanel() {
    return (
      <View style={{ alignItems: 'center' }}>
        <ImageWrapper
          resizeMode={'center'}
          source={util.safeValue(this.props.product, 'imageUrl', null)}
          style={{
            width: screen.width,
            height: scale(190),
            backgroundColor: colors.paleGrey
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: screen.distance.smaller, right: screen.distance.smaller }}
          onPress={this.onClose}
        >
          <Icon type="material-community" name="close" size={scale(24)} color={colors.brightOrange} />
        </TouchableOpacity>
        {/* add emptyview and then you can add report button :D */}
        <View style={styles.placeHolder} />
        {this.renderReportButton()}
      </View>
    );
  }

  renderReportButton = () => {
    return (
      <TouchableOpacity onPress={() => this.setState({ reportModalVisible: true })} style={styles.reportButton}>
        <Icon name="error" size={scale(20)} color={colors.cloudyBlue} />
        <Text style={[fonts.subheading, { color: colors.steel, marginLeft: scale(4) }]}>Báo lỗi sản phẩm</Text>
      </TouchableOpacity>
    );
  };

  renderProductGeneralInfo() {
    let { product } = this.props;
    return (
      <View style={styles.infoSection}>
        <Text style={[fonts.subheading, { color: colors.clearBlue }]}>SKU: {util.safeValue(product, 'sku')}</Text>
        <Text style={fonts.display}>{util.safeValue(product, 'name')}</Text>
        <View style={{ flexDirection: 'row', marginTop: screen.distance.default }}>
          <ColoredTextLabel text={'Không xác định'} type={'info'} textStyle={{ fontFamily: 'sale-text-regular' }} />
          <ColoredTextLabel
            text={`BH ${util.safeValue(product, 'warranty')} tháng`}
            type="orange"
            style={{ marginLeft: scale(4) }}
            textStyle={{ fontFamily: 'sale-text-regular' }}
          />
        </View>
      </View>
    );
  }

  renderPriceSection() {
    let { product } = this.props;
    return (
      <View style={styles.priceSection}>
        <View style={styles.priceSectionInside}>
          <Text style={[fonts.price, { fontSize: scale(17) }]}>{util.formatPrice(util.safeValue(product, 'price'))}</Text>
          <Text style={[fonts.original_price, { marginLeft: scale(4), fontSize: scale(15) }]}>
            {util.formatPrice(util.safeValue(product, 'price'))}
          </Text>
        </View>
        {this.renderCartButton()}
      </View>
    );
  }

  renderCartButton() {
    return (
      <View style={styles.cartButtonContainer}>
        <Button
          title={'Chọn'}
          color={colors.brightOrange}
          textStyle={[fonts.heading1, { color: 'white' }]}
          onPress={this.onAddToCart}
          containerStyle={styles.addToCartButton}
        />
      </View>
    );
  }

  onAddToCart = () => {
    let { product } = this.props;
    let orderItem = getPromotionApplyResult({ product, quantity: 1 }, this.props.promotionsPreview);
    this.props.addItemToCart(orderItem);
    this.props.navigation.dispatch(navUtil.resetToCart());
  };

  onClose = () => {
    this.props.navigation.goBack();
  };
}

function mapStateToProps(state, props) {
  let { sku } = props.navigation.state.params;
  let product = useCaseCore.getProductDetail(state.productDetail, sku);
  return {
    product,
    promotionsPreview: state.promotionsPreview
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProductDetail: sku => dispatch(productDetailActions.fetchProductDetail(sku)),
    addItemToCart: orderItem => dispatch(cartActions.addItemToCart(orderItem))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: screen.header.statusBarHeight,
    backgroundColor: colors.paleGrey
  },
  placeHolder: {
    height: scale(14),
    width: screen.width,
    backgroundColor: 'white',
    borderTopColor: colors.paleLilac,
    borderTopWidth: 0.5
  },
  reportButton: {
    position: 'absolute',
    top: scale(176),
    right: scale(12),
    height: scale(28),
    paddingHorizontal: scale(4),
    alignItems: 'center',
    borderRadius: scale(14),
    borderColor: colors.paleLilac,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  cartButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  addToCartButton: {
    width: scale(70),
    height: scale(36),
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingVertical: screen.distance.default
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: screen.distance.smaller,
    paddingVertical: scale(6),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.paleLilac,
    backgroundColor: 'white'
  },
  priceSectionInside: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: screen.distance.smaller,
    alignItems: 'center'
  },
  infoSection: {
    padding: screen.distance.smaller,
    paddingTop: 0,
    borderBottomColor: colors.paleLilac,
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  }
});
