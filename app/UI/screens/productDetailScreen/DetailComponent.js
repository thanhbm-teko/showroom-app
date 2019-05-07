import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ReportModal from './modal/ReportModal';
import AdjustPromotionModal from './AdjustPromotionModal';
import ProductPromotion from './ProductPromotion';
import ImageWrapper from './ImageWrapper';
import InputRow from '../components/InputRow';
import Breadcrumb from './Breadcrumb';

import * as ProductActions from '../stores/product/actions';
import * as AppStateActions from '../stores/appState/actions';
import * as ProductsActions from '../stores/products/actions';
import { resetToCart } from '../stores/navigatorApp/actions';
import * as CartActions from '../stores/cart/actions';

import { AllowSaleProductWithType } from '../utils/ProductBizType';

import firebaseHelper from '../services/firebase';
import ProductService from '../services/product-service';

import { screen } from '../resources/styles/common';
import { getSalemanProgramValueForProduct } from '../utils/saleman';
import { scale } from '../utils/scaling';
import * as utils from '../utils';
import * as Const from '../constants';
import PRODUCT_ATTR_KEYS from '../config/product_specification.json';
import { TRACK_EVENT } from '../config/TrackingConstants';
import config from '../config';
import stock from '../config/stock';
import type_products from '../config/type_products';
import AllStock from '../utils/AllStock';

export class DetailComponent extends Component {
  constructor(props) {
    super(props);

    let { cartList, cartIndex, currentStoreId, detailList, sku } = props;
    let currentCart = utils.getCurrentCart(cartList, currentStoreId, cartIndex);
    let detailProduct = utils.getProductDetailFromAsiaCanEmptyData(sku, detailList);
    this.state = {
      visibleAdjustModal: false,
      showFirstTab: true,
      detailProduct,
      cartItem: null,
      salemanProgramValue: 0,
      currentCart,
      editPriceService: null,
      reportModalVisible: false,
      reportModalState: null,
      typeProduct: 'Hàng bán',
      typeProductCode: utils.BIZ_PRODUCT
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { cartList, cartIndex, currentStoreId, sku, detailList, servicesSku } = nextProps;
    let currentCart = utils.getCurrentCart(cartList, currentStoreId, cartIndex);
    let detailProduct = utils.getProductDetailFromAsiaCanEmptyData(sku, detailList);
    if (servicesSku.indexOf(sku) >= 0) {
      let editPrice =
        currentCart &&
        currentCart._productSaleInProgress &&
        currentCart._productSaleInProgress.length > 0 &&
        currentCart._productSaleInProgress.find(p => p.sku === sku)
          ? currentCart._productSaleInProgress.find(p => p.sku === sku).price
          : detailList[sku] && detailList[sku].data.price_asia
          ? detailList[sku].data.price_asia
          : detailProduct && detailProduct.price_w_vat
          ? detailProduct.price_w_vat
          : 0;
      return {
        detailProduct,
        currentCart,
        editPriceService: editPrice
      };
    }
    return {
      detailProduct,
      currentCart
    };
  }

  componentDidMount() {
    this.calculateSalemanProgramValue(this.state.detailProduct);
    let { sku, forceLoadProductDetail, loadProductDetail, specification, loadProductSpecification, detailList } = this.props;
    let { currentCart, detailProduct } = this.state;
    if (
      currentCart &&
      currentCart._productSaleInProgress &&
      currentCart._productSaleInProgress.findIndex(p => p.sku === sku) !== -1
    ) {
      let typeProductCode = detailList[sku] && detailList[sku].type_product ? detailList[sku].type_product : utils.BIZ_PRODUCT;
      let typeProduct = type_products.find(t => t.key === typeProductCode)
        ? type_products.find(t => t.key === typeProductCode).label
        : 'Hàng bán';
      this.setState({
        typeProductCode,
        typeProduct
      });
    }
    if (detailProduct) {
      forceLoadProductDetail(sku);
    } else {
      loadProductDetail(sku);
    }
    if (!specification.find(item => item.sku === sku)) {
      loadProductSpecification(sku);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.detailProduct !== prevState.detailProduct) {
      this.calculateSalemanProgramValue(this.state.detailProduct);
    }

    const { currentStore, hostScreen, index, sku } = this.props;
    const { detailProduct } = this.state;

    if (currentStore && currentStore.profile) {
      let storeCode = currentStore.profile.store_id;

      if (this.state.detailProduct !== prevState.detailProduct && this.state.detailProduct) {
        if (isEmpty(detailProduct)) {
          firebaseHelper
            .tracking()
            .trackEvent(TRACK_EVENT.CHECK_PRODUCT_DETAIL, sku, index, hostScreen, storeCode, false, false);
        } else {
          let currentStoreStock = utils.getAsiaCurrentStoreStockForProduct(detailProduct, currentStore);
          let outOfStock = currentStoreStock <= 0;
          firebaseHelper
            .tracking()
            .trackEvent(TRACK_EVENT.CHECK_PRODUCT_DETAIL, sku, index, hostScreen, storeCode, true, outOfStock);
        }
      }
    }
  }

  calculateSalemanProgramValue = product => {
    if (product) {
      let { salemanPrograms } = this.props;
      let salemanProgramValue = getSalemanProgramValueForProduct(salemanPrograms, product);
      this.setState({ salemanProgramValue });
    } else {
      this.setState({ salemanProgramValue: 0 });
    }
  };

  getStockQty = mode => {
    let { currentStore, detailList, sku, firebaseConfig, isUsingOM } = this.props;
    let totalStock = isUsingOM
      ? utils.getWmsTotalStock(sku, detailList, firebaseConfig.saleStores, mode)
      : utils.getAsiaTotalStock(sku, detailList, firebaseConfig.saleStores);
    let currentStoreStock = isUsingOM
      ? utils.getWmsCurrentStoreStock(sku, detailList, currentStore, mode)
      : utils.getAsiaCurrentStoreStock(sku, detailList, currentStore);
    return `${currentStoreStock} / ${totalStock}`;
  };

  onClose = () => {
    this.setState({
      visibleAdjustModal: false
    });
  };

  onFinish = () => {
    this.setState({
      visibleAdjustModal: false
    });
    this.props.navigation.goBack();
  };

  onChooseProductSale = cartItem => {
    this.setState({ cartItem });
  };

  checkEmptyStore = () => {
    let { sku, detailList, isUsingOM, currentStore, servicesSku } = this.props;
    if (servicesSku.indexOf(sku) === -1) {
      let stockProduct = isUsingOM
        ? utils.getWmsCurrentStoreStock(sku, detailList, currentStore)
        : utils.getAsiaCurrentStoreStock(sku, detailList, currentStore);
      if (stockProduct <= 0) {
        return true;
      }
    }

    return false;
  };

  addCart = () => {
    let { hostScreen, onCartPressed, navigation, customGoBack, sku, isUsingOM, notAllowSellectProductBiztype } = this.props;
    let { detailProduct, currentCart, cartItem, typeProductCode } = this.state;

    // nếu là quà xin thêm hoặc sản phẩm combo thì k cập nhật loại hàng lên detailList
    let isNotAddGift = !currentCart || (currentCart && !currentCart._change_gift);
    let notAllowChangeProductBizType =
      notAllowSellectProductBiztype ||
      (navigation && navigation.state && navigation.state.params
        ? navigation.state.params.notAllowSellectProductBiztype
        : false);
    if (isUsingOM && !notAllowChangeProductBizType && isNotAddGift) {
      this.props.updateTypeProduct(sku, typeProductCode);
    }
    if (onCartPressed) {
      this.props.clearProducts();
      onCartPressed(detailProduct, cartItem);
      if (customGoBack) {
        customGoBack();
      } else {
        navigation.goBack();
      }
    } else if (currentCart && currentCart._change_gift) {
      if (currentCart._change_gift.gift) {
        this.props.changeGiftResult({
          sku: detailProduct.sku,
          quantity: currentCart._change_gift.gift.quantity,
          time: Date.now(),
          user: this.props.user.uid
        });
        this.props.clearProducts();
        navigation.goBack();
      } else {
        this.setState({
          visibleAdjustModal: true
        });
        this.props.clearProducts();
      }
    } else if (cartItem) {
      let elapsedTime = Math.floor((new Date().getTime() - this._startTimer) / 1000);
      firebaseHelper.tracking().trackEvent(TRACK_EVENT.CHOOSE_PRODUCT, cartItem.sku, -1, elapsedTime, 'ProductDetail');
      this.props.changeProductSale(
        cartItem.uuid,
        cartItem.sku,
        cartItem.quantity,
        cartItem.promotion,
        cartItem.overlapPromotions,
        this.onChangeQuantityFinish,
        cartItem.asiaPromotion,
        this.state.editPriceService
      );
      this.props.clearProducts();
    }
  };

  onPressCartButton = () => {
    let { servicesSku, isUsingOM, sku, user, detailList, currentStore } = this.props;
    let { detailProduct, currentCart, typeProductCode } = this.state;
    // let isAllow = AllowSaleProductWithType(
    //   user.profile.default_shop,
    //   typeProductCode,
    //   detailList[sku].data.wms_stock ? detailList[sku].data.wms_stock : []
    // );

    // if (isUsingOM && !currentStore.bypass_biz_type_validation && !isAllow) {
    //   Alert.alert('Thông báo', 'Mã sản phẩm ' + sku + ' chưa được map loại hàng. Vui lòng liên hệ ngành hàng!');
    //   return;
    // }

    if (
      (!currentCart || !currentCart._change_gift) &&
      (detailProduct.price_w_vat === null || detailProduct.price_w_vat === undefined) &&
      servicesSku.indexOf(detailProduct.sku) < 0
    ) {
      Alert.alert('Thông tin', `Giá sản phẩm không hợp lệ, vui lòng liên hệ ngành hàng để sửa giá!`);
      return;
    }

    if (detailProduct.status === utils.SAMPLE_PRODUCT) {
      Alert.alert('Thông tin', `Hiện app chưa hỗ trợ bán hàng trưng bày.\nVui lòng tạo đơn trên Asia!`);
      return;
    }

    if (
      detailProduct.status === utils.OUT_OF_STOCK_PRODUCT ||
      detailProduct.status === utils.PRE_ORDER ||
      detailProduct.status === utils.STOP_BUSSINESS_PRODUCT
    ) {
      Alert.alert(
        'Thông tin',
        `Sản phẩm đang ở trạng thái "${
          detailProduct.status_detail
        }" nên không thể thêm vào giỏ hàng.\nVui lòng liên hệ ngành hàng để biết thêm chi tiết!`
      );
      return;
    }

    if (isUsingOM && this.checkEmptyStore()) {
      // if empty stock , show alert
      Alert.alert(
        'Thông báo',
        'Sản phẩm đã hết trong kho cửa hàng, bạn sẽ cần được duyệt mới bán được.\nBạn vẫn muốn thêm vào giỏ hàng chứ?',
        [{ text: 'không' }, { text: 'có', onPress: this.addCart }],
        { cancelable: false }
      );
    } else {
      this.addCart();
    }
  };

  editPriceService = editPriceService => {
    this.setState({
      editPriceService
    });
  };

  onChangeQuantityFinish = (success, message) => {
    if (!success) {
      this.forceUpdate();
      Alert.alert('', message, [{ text: 'OK' }], { cancelable: false });
    } else {
      //go back and navigate to cart
      this.props.navigation.navigate('Cart', {}, resetToCart());
    }
  };

  renderCartButton() {
    return (
      <View style={styles.cartButtonContainer}>
        {this.state.cartItem &&
        (!this.props.isUsingOM || this.state.detailProduct.wms_stock) &&
        this.state.detailProduct.status_detail ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={this.onPressCartButton}
            accessibilityLabel={'add_product_to_cart'}
          >
            <Text style={styles.cartText}>Chọn</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addToCartButton}>
            <ActivityIndicator style={styles.loadingIndicator} color="white" />
          </View>
        )}
      </View>
    );
  }

  renderSpecificationTable(isLoading, data) {
    let { isUsingOM } = this.props;
    return (
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : !data || data.length <= 0 ? (
          <Text style={[styles.stock_key, { textAlign: 'center' }]}>Không có thông tin</Text>
        ) : (
          data.map((item, index) => {
            return (
              <View style={{ flexDirection: 'row' }} key={index}>
                <View style={styles.specification_key}>
                  <Text
                    style={[
                      {
                        color: item.highlight ? '#1c65aa' : 'black',
                        fontSize: 15
                      },
                      isUsingOM
                        ? {}
                        : {
                            textAlign: 'center'
                          }
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                <View style={styles.specification_value}>
                  <Text style={{ color: item.highlight ? '#e60000' : 'black', fontSize: 15 }}>{item.value}</Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    );
  }

  renderNotes(product) {
    let now = utils.getNow();

    if (product.promotions && product.promotions.notes && product.promotions.notes.length > 0) {
      return (
        <View style={{ marginTop: screen.margin }}>
          <Text style={{ fontWeight: 'bold', fontSize: screen.common.mediumFontSize }}>Ghi chú: </Text>
          {product.promotions.notes
            .filter(n => now.timeStr > n.begun_at && now.timeStr < n.ended_at)
            .map((n, i) => (
              <Text style={{ fontSize: screen.smallFontSize }} key={i}>
                {`• ${n.name}\n`}
                <Text style={{ fontFamily: 'sale-text-light-italic', color: '#e60000' }}>
                  Từ {utils.simplifyTimeStr(n.begun_at)} đến {utils.simplifyTimeStr(n.ended_at)}
                </Text>
              </Text>
            ))}
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    let product = this.state.detailProduct;
    let catName, catParentName;
    let item = this.props.item;
    if (product) {
      let cat = this.props.categories.data.find(item => item.code === product.category);
      if (cat) {
        catName = cat.name;
        if (cat.parent !== '') {
          let catParent = this.props.categories.data.find(item => item.code === cat.parent);
          catParentName = catParent && catParent.name;
        }
      }
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'whitesmoke', flexDirection: 'row', alignItems: 'center', padding: screen.padding }}>
          <Breadcrumb
            style={{ flex: 1 }}
            root={catParentName}
            current={catName}
            product={(item && item.name) || (product && product.name)}
          />
          {this.props.onClose ? (
            <TouchableOpacity onPress={this.props.onClose}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginLeft: screen.margin
                }}
              >
                <Icon type="evilicon" name="close" size={screen.common.iconSize} />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        {this.renderContent(product)}
      </View>
    );
  }

  renderContent(product) {
    let { currentCart } = this.state;
    let { navigation, notAllowSellectProductBiztype } = this.props;
    let notAllowChangeProductBizType =
      notAllowSellectProductBiztype ||
      (navigation && navigation.state && navigation.state.params
        ? navigation.state.params.notAllowSellectProductBiztype
        : false);
    if (product === null) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    } else if (isEmpty(product)) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: screen.common.fontSize, fontWeight: 'bold' }}>Không có chi tiết sản phẩm</Text>
        </View>
      );
    }

    let spec = this.props.specification.find(item => item.sku === this.props.sku);

    let { firebaseConfig, hostScreen, isUsingOM, sku, servicesSku, detailList, user } = this.props;
    let salemanConfig = firebaseConfig && firebaseConfig.saleman;
    let shouldShowSalemanValueForProduct =
      this.state.salemanProgramValue && (hostScreen === 'Salesman' || (salemanConfig && salemanConfig.allowShowNotInDetail));

    let description = 'Chưa có thông tin';
    if (spec && spec.description && spec.description.length > 0 && firebaseConfig.useWebDescription) {
      description = spec.description;
    }
    if (product.description && product.description.length > 0 && !firebaseConfig.useWebDescription) {
      description = product.description;
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            backgroundColor: 'white',
            paddingHorizontal: screen.padding,
            flex: 1
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <ImageWrapper
              source={spec && spec.source_url ? spec.source_url.base_image_smallsquare : null}
              style={{ width: scale(200), height: scale(200), marginVertical: screen.margin }}
            />
          </View>
          {/* Thông tin chung */}
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: screen.padding,
              marginBottom: screen.margin,
              borderBottomColor: '#707070',
              borderBottomWidth: 1
            }}
          >
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Text style={styles.infoText}>
                Trạng thái:{' '}
                <Text style={{ color: '#0039e6' }}>{product.status_detail ? product.status_detail : 'Không xác định'}</Text>
              </Text>
              <Text style={styles.infoText}>
                Mã SP: <Text style={{ color: '#0039e6' }}>{product.sku}</Text>
              </Text>
              {product.sale_point !== null ? (
                <Text style={styles.infoText}>
                  Điểm thưởng: <Text style={{ color: '#0039e6' }}>{product.sale_point}</Text>
                </Text>
              ) : null}
              {shouldShowSalemanValueForProduct ? (
                <Text style={styles.infoText}>
                  Saleman: <Text style={{ color: '#e60000' }}>{this.state.salemanProgramValue}</Text>
                </Text>
              ) : null}
              {isUsingOM ? (
                <View>
                  <Text style={styles.infoText}>
                    Hàng khả dụng: <Text style={{ color: '#0039e6' }}>{this.getStockQty('available')}</Text>
                  </Text>
                  <Text style={styles.infoText}>
                    Hàng thực tế: <Text style={{ color: '#0039e6' }}>{this.getStockQty('on_hand')}</Text>
                  </Text>
                </View>
              ) : (
                <Text style={styles.infoText}>
                  Kho hàng: <Text style={{ color: '#0039e6' }}>{this.getStockQty()}</Text>
                </Text>
              )}
              <Text style={styles.infoText}>
                Bảo hành: <Text style={{ color: '#0039e6' }}>{product.warranty} tháng</Text>
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {this.renderReportButton()}
              {this.renderCartButton()}
            </View>
          </View>
          {!notAllowChangeProductBizType &&
          isUsingOM &&
          servicesSku.indexOf(sku) === -1 &&
          (!currentCart || (currentCart && !currentCart._change_gift)) ? (
            <InputRow
              accessibilityLabel="input_row_type_product"
              caption="Loại hàng"
              inputType="picker"
              notMarginRow={true}
              inputValue={this.state.typeProduct}
              onEndEditing={(code, name) => {
                // let isAllow = AllowSaleProductWithType(
                //   user.profile.default_shop,
                //   code,
                //   detailList[sku].data.wms_stock ? detailList[sku].data.wms_stock : []
                // );
                // if (isAllow) {
                this.setState({
                  typeProduct: name,
                  typeProductCode: code
                });
                // } else {
                //   setTimeout(() => {
                //     Alert.alert('Thông báo', 'Ở cửa hàng hiện tại không có loại hàng này!');
                //   }, 1000);
                //50409
                // }
              }}
              pickerData={type_products}
            />
          ) : null}
          {/* Các chương trình khuyến mãi của sản phẩm */}
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: screen.padding,
              marginBottom: screen.margin,
              borderBottomColor: '#707070',
              borderBottomWidth: 1
            }}
          >
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
          </View>
          {/* Mô tả sản phẩm */}
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: screen.common.mediumFontSize }}>Mô tả sản phẩm:</Text>
            <Text style={{ fontSize: screen.smallFontSize }}>{description}</Text>
          </View>
          {/* Ghi chú khuyến mãi từ asia */}
          {this.renderNotes(product)}
          {/* Thông số kỹ thuật, kho hàng */}
          <View style={{ flexDirection: 'row', marginTop: screen.margin }}>
            <TouchableOpacity
              style={{ flex: 1, padding: screen.padding, backgroundColor: this.state.showFirstTab ? '#0E5CA4' : '#439cef' }}
              onPress={() => this.setState({ showFirstTab: true })}
            >
              <Text style={{ textAlign: 'center', color: 'white' }}>Kho hàng{isUsingOM ? '\n(khả dụng/thực tế)' : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, padding: screen.padding, backgroundColor: this.state.showFirstTab ? '#439cef' : '#0E5CA4' }}
              onPress={() => this.setState({ showFirstTab: false })}
            >
              <Text style={{ textAlign: 'center', color: 'white' }}>Thông số kỹ thuật</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: screen.margin }}>
            {this.state.showFirstTab
              ? this.renderSpecificationTable(
                  false,
                  isUsingOM ? this.getStockWms(product.wms_stock) : this.transformStock(product.store_in_stock)
                )
              : this.renderSpecificationTable(this.props.isLoading, spec ? this.transformAttributes(spec.attributes) : [])}
          </View>
          {this.props.recentList.length > 0 ? this.renderRecent() : <View style={{ marginBottom: scale(100) }} />}
        </ScrollView>
        <AdjustPromotionModal
          visible={this.state.visibleAdjustModal}
          sku={this.state.detailProduct.sku}
          onFinish={this.onFinish}
          onClose={this.onClose}
        />
        <ReportModal
          visible={this.state.reportModalVisible}
          onClose={this.onCloseReportModal}
          onSubmit={this.onSubmit}
          ref={ref => (this.reportModal = ref)}
          onReportModalDismiss={this.onReportModalDismiss}
        />
      </View>
    );
  }

  onCloseReportModal = () => {
    this.setState({ reportModalVisible: false });
  };

  wait = () => {
    return new Promise(res => setTimeout(res, 1000));
  };

  onReportModalDismiss = async () => {
    if (this.state.reportModalState) {
      //generate content and title
      let { title, content } = utils.generateContentAndTitle(
        this.state.reportModalState,
        this.props.user.profile,
        this.props.sku,
        this.state.detailProduct.name
      );
      let ret;
      this.props.showHideLoadingModal('Đang gửi thông tin...', true);
      if (config.env === 'production') {
        //send to WP api
        ret = await ProductService.createNewWPPost(title, content);
      } else {
        await this.wait();
        ret = { ok: true };
      }
      if (ret.ok) {
        this.props.showHideLoadingModal(
          'Thông tin đã được gửi thành công. Sản phẩm sẽ được sửa trong thời gian sớm nhất. Xin cảm ơn!',
          true,
          this.closeAlert
        );
      } else {
        this.props.showHideLoadingModal('Có lỗi xảy ra!\n' + JSON.stringify(ret.data), true, this.closeAlert);
      }
    }
  };

  onSubmit = async state => {
    this.setState({ reportModalState: state }, () => {
      this.onCloseReportModal(); //on ios, onReportModalDismiss should be call

      //the onDismiss prop is only-ios, so we have to call it manual
      if (Platform.OS === 'android') this.onReportModalDismiss();
    });
  };

  closeAlert = () => {
    this.props.showHideLoadingModal('', false);
    this.reportModal.clearContent();
    this.setState({ reportModalState: null });
  };

  renderReportButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ reportModalVisible: true })}
        style={{
          paddingVertical: scale(5),
          paddingHorizontal: scale(10),
          borderRadius: scale(20),
          backgroundColor: 'gray',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Icon name="error" size={screen.common.mediumIconSize} color={'white'} />
        <Text style={{ color: 'white', fontSize: screen.common.mediumFontSize, marginLeft: scale(5) }}>Báo lỗi</Text>
      </TouchableOpacity>
    );
  };

  onClose = () => {
    this.setState({});
  };

  renderRecent() {
    return (
      <View style={{ marginBottom: scale(100), padding: 5, borderWidth: 1, borderColor: '#999' }}>
        <Text>Các sản phẩm xem gần đây</Text>
        <FlatList
          horizontal={true}
          data={this.props.recentList}
          keyExtractor={item => item.sku}
          renderItem={({ item, index }) => {
            let spec = this.props.specification.find(it => it.sku === item.sku);
            return (
              <TouchableOpacity
                style={{ width: scale(80), margin: scale(5), justifyContent: 'space-between' }}
                onPress={() => this.props.navigation.navigate('ProductDetail', { sku: item.sku, from: 'Detail' })}
              >
                <Text style={{ fontSize: 10, textAlign: 'center' }} numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={{ alignItems: 'center' }}>
                  <ImageWrapper
                    source={spec && spec.source_url ? spec.source_url.base_image_smallsquare : null}
                    style={{ width: scale(80), height: scale(80), marginTop: scale(5) }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  getStockWms(stockWms) {
    if (!stockWms || !Array.isArray(stockWms)) return [];
    let { user } = this.props;
    stockWms = stockWms.map(e => {
      let warehouse = e.warehouse ? e.warehouse : 'Mã kho chưa xác định';
      let warehouseName = AllStock.getData().find(s => s.key == e.warehouse)
        ? AllStock.getData().find(s => s.key == e.warehouse).name
        : 'Tên kho chưa xác định';
      let typeProduct = type_products.find(p => p.key === e.product_biz_type)
        ? type_products.find(p => p.key === e.product_biz_type).label
        : 'Loại hàng chưa xác định';
      return {
        label: `${warehouse}${'\n'}${warehouseName}${'\n'}${typeProduct}`,
        value: `${e.available}/${e.on_hand}`,
        highlight: e.branch === user.profile.default_shop ? 1 : 0
      };
    });
    stockWms = stockWms.filter(s => s.value !== '0/0');
    stockWms.sort((a, b) => b.highlight - a.highlight);
    return stockWms;
  }

  transformStock(storeInStock) {
    if (!storeInStock || isEmpty(storeInStock)) {
      return [];
    } else {
      let { firebaseConfig, currentStore } = this.props;
      let stocks = (currentStore && currentStore.stocks) || [];
      let allStocksInStore = (currentStore && currentStore.allStocks) || [];
      let transformedStock = Object.keys(storeInStock)
        .map((key, index) => {
          if (firebaseConfig.saleStores.indexOf(key) !== -1) {
            return {
              label: storeInStock[key].store_name,
              value: storeInStock[key].quantity,
              highlight: Number(stocks.includes(key)) + Number(allStocksInStore.includes(key))
            };
          } else {
            return null;
          }
        })
        .filter(e => e !== null);

      if (stocks.length > 0 || allStocksInStore.length > 0) {
        transformedStock.sort((a, b) => b.highlight - a.highlight);
      }
      return transformedStock;
    }
  }

  //use attribute from attributes.displayAttr insteads of attributes
  transformAttributes(attributes) {
    try {
      if (attributes && !isEmpty(attributes) && attributes.displayAttr) {
        return JSON.parse(attributes.displayAttr).map(item => {
          return { label: item.display_name, value: item.display_value };
        });
      }
    } catch (error) {
      console.log(error);
      return [];
    }
    return [];
  }

  // transformAttributes(attributes) {
  //   if (attributes && !isEmpty(attributes)) {
  //     let transformedAttributes = Object.keys(attributes)
  //       .map((key, index) => {
  //         if (!PRODUCT_ATTR_KEYS[key] || !attributes[key] || attributes[key] === '' || attributes[key] === 'KHT') {
  //           return null;
  //         } else {
  //           return {
  //             label: PRODUCT_ATTR_KEYS[key],
  //             value: attributes[key]
  //           };
  //         }
  //       })
  //       .filter(item => item !== null);
  //     return transformedAttributes;
  //   }
  //   return [];
  // }
}

function mapStateToProps(state, props) {
  let currentStore = state.shops.shopsList.find(e => e.shop_id === state.user.profile.default_shop);
  let isUsingOM = utils.isUsingOM(currentStore, state.user);
  let { servicesSku } = state.product;

  return {
    isUsingOM,
    servicesSku,
    shopsList: state.shops.shopsList,
    detailList: state.product.detailList,
    specification: state.product.specification,
    isLoading: state.product.isLoadSpecification,
    cartList: state.cart.cartList,
    cartIndex: state.cart.cartIndex,
    currentStore: state.shops.shopsList.find(e => e.shop_id === state.user.profile.default_shop),
    currentStoreId: state.cart.cartStoreId,
    recentList: state.product.recentList.map(sku => utils.getProduct(sku, state.products)).filter(e => e !== null),
    firebaseConfig: state.firebase.config,
    categories: state.product.categories,
    salemanPrograms: state.firebase.saleman,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTypeProduct: (sku, typeProduct) => dispatch(ProductActions.updateTypeProduct(sku, typeProduct)),
    changeGiftResult: result => dispatch(CartActions.changeGiftResult(result)),
    loadProductSpecification: sku => dispatch(ProductActions.loadProductSpecification(sku)),
    changeProductSale: (uuid, sku, quantity, promotion, overlapPromotions, callback, asiaPromotion, editPriceService) =>
      dispatch(
        CartActions.changeProductSale(
          uuid,
          sku,
          quantity,
          promotion,
          overlapPromotions,
          callback,
          asiaPromotion,
          editPriceService
        )
      ),
    loadProductDetail: sku => dispatch(ProductActions.loadProductDetail(sku)),
    forceLoadProductDetail: sku => dispatch(ProductActions.loadProductDetail(sku, true)),
    clearProducts: text => dispatch(ProductsActions.clearProducts()),
    showHideLoadingModal: (message, visible, onConfirm) =>
      dispatch(AppStateActions.showHideLoadingModal(message, visible, onConfirm))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailComponent);

const styles = StyleSheet.create({
  stock_key: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#999',
    padding: screen.padding
  },
  specification_key: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: screen.padding
  },
  specification_value: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: screen.padding,
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  },
  cartButtonContainer: {
    marginTop: screen.margin,
    flex: 1,
    justifyContent: 'flex-end'
  },
  addToCartButton: {
    backgroundColor: '#0E5CA4',
    borderRadius: 3,
    overflow: 'hidden'
  },
  cartText: {
    paddingHorizontal: screen.padding * 3,
    paddingVertical: screen.padding,
    fontSize: screen.common.titleFontSize,
    textAlign: 'center',
    color: 'white'
  },
  infoText: {
    fontSize: screen.common.fontSize
  },
  loadingIndicator: {
    paddingHorizontal: screen.padding * 3,
    paddingVertical: screen.padding
  }
});
