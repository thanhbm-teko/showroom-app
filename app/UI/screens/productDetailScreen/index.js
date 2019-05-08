import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as useCaseCore from '../../../core/useCase/productDetail/productDetail.ts';

import Button from '../../components/button/Button';
import ImageWrapper from '../../components/ImageWrapper';
import ColoredTextLabel from '../../components/label/ColoredTextLabel';
import ProductTypeChooser from './ProductTypeChooser';
import ProductSpecTable from './ProductSpecTable';
import StockInfo from './StockInfo';

import { fonts, screen, colors, scale } from '../../styles';
import * as productDetailActions from '../../reduxConnector/productDetail/actions';
import * as util from '../../util';

export class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    this.props.fetchProductDetail('1200512');
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
            <ProductTypeChooser
              productTypes={[
                {
                  key: 'Biz',
                  label: 'Hàng bán'
                },
                {
                  key: 'Disp',
                  label: 'Hàng trưng bày'
                },
                {
                  key: 'Outlet',
                  label: 'Hàng thanh lý'
                }
              ]}
              selectedProductType={'Biz'}
            />
            {this.renderPriceSection()}
            <StockInfo stocks={[{ label: 'Kho 1', value: '1' }, { label: 'Kho 2', value: '2' }]} isUsingOm={false} />
          </View>
          {/* Các chương trình khuyến mãi của sản phẩm */}
          {/* <View style={{ paddingTop: scale(10) }}>
            <ProductPromotion
              editPrice={this.state.editPriceService === null ? 0 : this.state.editPriceService}
              editPriceService={this.editPriceService}
              product={product}
              ignoreCheckVoucher={this.props.ignoreCheckVoucher}
              hidePromotion={this.props.hidePromotion}
              hostScreen="detail"
              onChooseProductSale={this.onChooseProductSale}
              cartItem={this.props.cartItem}
              defaultPromotion={this.props.defaultPromotion}
            />
          </View> */}
          <ProductSpecTable
            description={util.valueOrPlaceholder(product, 'description')}
            specifications={[{ label: 'Thông số 1', value: '100' }, { label: 'Thông số 2', value: '200' }]}
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
          source={null}
          style={{
            width: screen.width,
            height: scale(190),
            backgroundColor: colors.paleGrey
          }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: screen.distance.smaller, right: screen.distance.smaller }}
          onPress={this.props.onClose}
        >
          <Icon type="material-community" name="close" size={scale(24)} color={colors.brightOrange} />
        </TouchableOpacity>
        {/*  add emptyview and then you can add report button :D */}
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
        <Text style={[fonts.subheading, { color: colors.clearBlue }]}>SKU: {util.valueOrPlaceholder(product, 'sku')}</Text>
        <Text style={fonts.display}>{util.valueOrPlaceholder(product, 'name')}</Text>
        <View style={{ flexDirection: 'row', marginTop: screen.distance.default }}>
          <ColoredTextLabel text={'Không xác định'} type={'info'} textStyle={{ fontFamily: 'sale-text-regular' }} />
          <ColoredTextLabel
            text={`BH ${util.valueOrPlaceholder(product, 'warranty')} tháng`}
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={[fonts.medium, { color: colors.brightOrange, paddingVertical: screen.distance.smaller }]}>
            {util.valueOrPlaceholder(product, 'price_w_vat')}
          </Text>
          <Text style={[fonts.body1, { color: colors.darkGray, textDecorationLine: 'line-through', marginLeft: scale(4) }]}>
            {util.valueOrPlaceholder(product, 'original_price')}
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
          onPress={this.onPressCartButton}
          containerStyle={styles.addToCartButton}
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  let product = useCaseCore.getProductDetail(state.productDetail, '1200512');
  return {
    product
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProductDetail: sku => dispatch(productDetailActions.fetchProductDetail(sku))
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
    marginTop: screen.margin.default,
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
  infoSection: {
    padding: screen.distance.smaller,
    paddingTop: 0,
    borderBottomColor: colors.paleLilac,
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  }
});
