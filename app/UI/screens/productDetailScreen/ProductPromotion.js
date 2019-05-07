// import React, { Component } from 'react';
// import { Text, View, TouchableOpacity, StyleSheet, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { Ionicons } from '@expo/vector-icons';
// import { connect } from 'react-redux';
// import uuidv4 from 'uuid/v4';
// import Collapsible from 'react-native-collapsible';

// import OverlapPromotion from './OverlapPromotion';
// import AsiaPromotion from './promotion/AsiaPromotions';
// import BenefitItem from './BenefitItem';
// import * as utils from '../utils';
// import * as voucherUtils from '../utils/voucher';
// import * as promotionUtils from '../utils/promotion';
// import { scale } from '../utils/scaling';
// import * as strings from '../resources/string';
// import * as ProductActions from '../stores/product/actions';
// import { screen, colors, textStyles } from '../resources/styles/common';
// import ChoosePromotionsModal from '../components/modal/ChoosePromotionsModal';
// import ColoredTextLabel from './label/ColoredTextLabel';

// class ProductPromotion extends Component {
//   state = {
//     showPromotions: false,
//     productPromotions: [],
//     choosingCartItem: null,
//     collapsed: true
//   };

//   onToggleShowPromotions = () => {
//     this.setState({ showPromotions: !this.state.showPromotions });
//   };

//   componentDidMount() {
//     let { editPrice } = this.props;
//     this.setState({
//       editPriceService: editPrice
//     });
//   }

//   onChangeBenefitQuantity = (promotion, path, quantity) => {
//     let { promotionFrom, index } = promotion;
//     let { onChooseProductSale } = this.props;
//     let { choosingCartItem } = this.state;

//     if (choosingCartItem) {
//       let currentBenefit = null;
//       if (promotionFrom === 'promotion_new' && choosingCartItem.promotion) {
//         currentBenefit = choosingCartItem.promotion;
//       } else if (promotionFrom === 'overlap' && choosingCartItem.overlapPromotions[index]) {
//         currentBenefit = choosingCartItem.overlapPromotions[index];
//       } else if (promotionFrom === 'asia') {
//         currentBenefit = choosingCartItem.asiaPromotion;
//       }

//       if (currentBenefit) {
//         let keys = path.split('/');
//         for (let k of keys) {
//           if (currentBenefit) {
//             currentBenefit = currentBenefit[k];
//           }
//         }
//         if (currentBenefit) {
//           currentBenefit = utils.scaleNewPromotionBenefitQuantity(currentBenefit, quantity);
//           this.setState({ choosingCartItem: JSON.parse(JSON.stringify(choosingCartItem)) }, () => {
//             onChooseProductSale && onChooseProductSale(this.state.choosingCartItem);
//           });
//         }
//       }
//     }
//   };

//   onChangeProductSale = promotion => {
//     let { hostScreen, product, currentCart, onChooseProductSale, ignoreCheckVoucher } = this.props;
//     if (hostScreen === 'detail') {
//       if (
//         !ignoreCheckVoucher &&
//         promotion.promotionFrom !== 'none' &&
//         currentCart &&
//         !voucherUtils.canKeepVouchersAfterApplyPromotion(promotion, currentCart._vouchers)
//       ) {
//         Alert.alert(strings.waring, strings.remove_voucher_warning);
//         return;
//       }

//       let { choosingCartItem, overlapPromotions } = this.state;

//       let quantity = choosingCartItem ? choosingCartItem.quantity : 1;
//       let uuid = choosingCartItem ? choosingCartItem.uuid : uuidv4();
//       let productSale = promotionUtils.getProductSale(promotion, product, quantity);
//       this.setState(
//         { choosingCartItem: { uuid, sku: product.sku, quantity, promotion: productSale, overlapPromotions } },
//         () => {
//           onChooseProductSale && onChooseProductSale(this.state.choosingCartItem);
//         }
//       );
//     } else {
//       onChooseProductSale && onChooseProductSale();
//     }
//   };

//   renderSelector = (promotion, showOnlySelectedPromotion) => {
//     let { hostScreen, hidePromotion } = this.props;
//     if (hostScreen === 'cart') return null;
//     let { choosingCartItem, productPromotions } = this.state;
//     let selectedKey = choosingCartItem && choosingCartItem.promotion ? choosingCartItem.promotion.key : null;
//     if (showOnlySelectedPromotion) return null;
//     let iconToShow =
//       hostScreen === 'cart'
//         ? 'dots-horizontal'
//         : selectedKey === promotion.key
//         ? 'radio-button-checked'
//         : 'radio-button-unchecked';
//     let editable = !hidePromotion || promotion.promotionFrom === 'none';

//     // in case of change promotion, gray the icon if there are no promotion program
//     let nopromo = iconToShow === 'radio-button-unchecked' && productPromotions.length <= 1;
//     let color = !editable || selectedKey !== promotion.key ? colors.cloudyBlue : nopromo ? '#0E5CA4' : colors.brightOrange;

//     return (
//       <TouchableOpacity
//         onPress={() => this.onChangeProductSale(promotion)}
//         disabled={!editable}
//         style={{ padding: screen.distance.smaller, paddingRight: 0 }}
//       >
//         <Icon type="material" name={iconToShow} size={scale(24)} color={color} />
//       </TouchableOpacity>
//     );
//   };

//   renderPrice = discount => {
//     let { product, cartItem } = this.props;
//     let { choosingCartItem } = this.state;
//     let priceAfterApplyOverlap =
//       product.price_w_vat -
//       promotionUtils.calculateTotalOverlapDiscount(product.price_w_vat, choosingCartItem.overlapPromotions);

//     return (
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {discount > 0 ? <Text style={styles.originalPrice}>{utils.formatPrice(priceAfterApplyOverlap)}</Text> : null}

//         <Text style={[textStyles.heading1, { color: colors.brightOrange }]}>
//           {' '}
//           {this.props.servicesSku.indexOf(this.props.product.sku) < 0
//             ? utils.formatPrice(priceAfterApplyOverlap - discount)
//             : utils.formatPrice(cartItem.price)}
//         </Text>
//         {discount > 0 ? (
//           <Text style={[textStyles.subheading, { textDecorationLine: 'line-through', marginLeft: screen.distance.default }]}>
//             {utils.formatPrice(this.props.product.price_w_vat)}
//           </Text>
//         ) : null}
//       </View>
//     );
//   };

//   renderPromotionHeader = (promotion, programName, discount, showOnlySelectedPromotion) => {
//     let { hidePromotion } = this.props;
//     let editable = !hidePromotion || promotion.promotionFrom === 'none';
//     let { quantity_left, promotionFrom, limited_quantity } = promotion;
//     if (promotion.name === 'Không sử dụng khuyến mãi')
//       return (
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           {this.renderSelector(promotion)}
//           <TouchableOpacity
//             style={{ padding: scale(14), flex: 1 }}
//             onPress={() => this.onChangeProductSale(promotion)}
//             disabled={!editable}
//           >
//             <Text style={textStyles.body1}>{programName}</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     else
//       return (
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           {this.renderSelector(promotion, showOnlySelectedPromotion)}
//           <TouchableOpacity
//             style={{
//               paddingHorizontal: screen.distance.smaller,
//               paddingVertical: screen.distance.default,
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}
//             onPress={() => this.onChangeProductSale(promotion)}
//             disabled={!editable}
//           >
//             <View>
//               {promotionFrom && promotionFrom !== 'none' ? (
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Text style={[textStyles.heading1]}>{programName}</Text>
//                 </View>
//               ) : null}
//               {this.renderPrice(discount)}
//               {/* {quantity_left ? (
//                 <Text style={[textStyles.footnote, { color: colors.clearBlue }]}>{`Số lượng KM: ${quantity_left}`}</Text>
//               ) : null} */}
//               {limited_quantity ? (
//                 <Text
//                   style={[textStyles.subheading, { color: colors.orangeRed }]}
//                 >{`*Giới hạn ${limited_quantity} sp trên mỗi đơn hàng`}</Text>
//               ) : null}
//             </View>
//             {quantity_left ? <ColoredTextLabel textStyle={textStyles.footnote} type="quantity" text={quantity_left} /> : null}
//           </TouchableOpacity>
//         </View>
//       );
//   };

//   getBenefitTree = benefit => {
//     if (benefit.quantity === 0) return null;
//     else if (benefit.benefits) {
//       benefit.benefits = benefit.benefits.map(ben => this.getBenefitTree(ben)).filter(it => it);
//     }
//     return benefit;
//   };

//   flatten = benefits => {
//     let ret = [];
//     const recursive = benefits => {
//       for (let item of benefits) {
//         if (item.benefits) recursive(item.benefits);
//         else ret = ret.concat(item);
//       }
//     };
//     recursive(benefits);
//     return ret;
//   };

//   renderPromotionNew(promotion, showOnlySelectedPromotion) {
//     let { hostScreen, hidePromotion, product } = this.props;
//     let { choosingCartItem } = this.state;
//     let benefit = null;
//     let isPromotionChosen = false;

//     // if (showOnlySelectedPromotion) {
//     //   //in DetailComponent, we only show the selected gifts
//     //   //filter the tree and remove zero quantity product
//     //   let only = this.getBenefitTree(choosingCartItem.promotion.benefit);
//     //   //flatten the tree
//     //   let benefits = this.flatten(only.benefits);
//     //   //assign the array to choosingCartItem
//     //   benefit = { ...choosingCartItem.promotion.benefit, benefits };
//     //   console.log('render promotion new1: ', benefit);
//     // } else
//     if (choosingCartItem && choosingCartItem.promotion && choosingCartItem.promotion.key === promotion.key) {
//       benefit = choosingCartItem.promotion.benefit;
//       isPromotionChosen = true;
//     } else {
//       benefit = promotion.benefit;
//     }

//     let selectedKey = choosingCartItem && choosingCartItem.promotion ? choosingCartItem.promotion.key : null;
//     if (selectedKey !== promotion.key && showOnlySelectedPromotion) {
//       return null;
//     }
//     let priceAfterApplyOverlap =
//       product.price_w_vat -
//       promotionUtils.calculateTotalOverlapDiscount(product.price_w_vat, choosingCartItem.overlapPromotions);
//     let { discount } = utils.getNewPromotionDiscountAndGifts(this.props.product.price_w_vat, benefit);
//     let appliedQuantity = choosingCartItem ? choosingCartItem.quantity : 1;
//     let programName = promotion.name || 'Khuyến mãi sản phẩm';
//     let parentBenefit = { path: '', isOneOf: false, quantity: appliedQuantity, benefits: [benefit] };

//     return (
//       <View style={hostScreen === 'detail' ? styles.promotionContainer : null}>
//         {this.renderPromotionHeader(promotion, programName, discount, showOnlySelectedPromotion)}
//         <Collapsible collapsed={selectedKey !== promotion.key}>
//           {selectedKey === promotion.key && benefit ? (
//             <View style={styles.promotionDetail}>
//               <BenefitItem
//                 editable={isPromotionChosen && hostScreen === 'detail' && !hidePromotion}
//                 benefit={benefit}
//                 parentBenefit={parentBenefit}
//                 siblingCount={1}
//                 currentStore={this.props.currentStore}
//                 detailList={this.props.detailList}
//                 loadGiftDetail={this.props.loadGiftDetail}
//                 onChangeBenefitQuantity={(path, quantity) =>
//                   this.onChangeBenefitQuantity({ promotionFrom: 'promotion_new' }, path, quantity)
//                 }
//               />
//             </View>
//           ) : null}
//         </Collapsible>
//       </View>
//     );
//   }

//   renderProductPromotion = (promotion, showOnlySelectedPromotion = false) => {
//     let { hostScreen } = this.props;
//     let { choosingCartItem } = this.state;

//     if (
//       promotion &&
//       choosingCartItem.promotion &&
//       (hostScreen === 'detail' ||
//         (promotion.promotionFrom === choosingCartItem.promotion.promotionFrom &&
//           promotion.key === choosingCartItem.promotion.key))
//     ) {
//       return this.renderPromotionNew(promotion, showOnlySelectedPromotion);
//     }
//   };

//   togglePromotions = () => {
//     this.setState({ collapsed: !this.state.collapsed });
//   };

//   renderProductPromotionInCartItem = () => {
//     let { asiaPromotion } = this.props;
//     let promotionsLength = this.state.choosingCartItem.promotion.key !== 'none' ? 1 : 0;
//     if (asiaPromotion) promotionsLength += 1;
//     if (promotionsLength === 0) return <View style={{ height: screen.distance.smaller }} />;

//     return (
//       <View style={styles.promotionsContainer}>
//         {this.state.productPromotions
//           ? this.state.productPromotions.map((promotion, index) => (
//               <View key={String(index)}>{this.renderProductPromotion(promotion)}</View>
//             ))
//           : null}
//         <AsiaPromotion
//           asiaPromotion={asiaPromotion}
//           currentStore={this.props.currentStore}
//           detailList={this.props.detailList}
//           loadGiftDetail={this.props.loadGiftDetail}
//         />
//         <View style={{ height: screen.padding }} />
//         {this.renderOverlapProductPromotions()}
//       </View>
//     );
//   };

//   renderOverlapProductPromotions = () => {
//     const { hostScreen, hidePromotion } = this.props;
//     const { overlapPromotions } = this.state.choosingCartItem;

//     return (
//       <OverlapPromotion
//         hostScreen={hostScreen}
//         hidePromotion={hidePromotion}
//         overlapPromotions={overlapPromotions}
//         onChangeBenefitQuantity={this.onChangeBenefitQuantity}
//       />
//     );
//   };

//   renderProductPromotionAsia = () => {
//     const { asiaPromotion } = this.state.choosingCartItem;
//     let promotionsLength = this.state.choosingCartItem.promotion.key !== 'none' ? 1 : 0;
//     if (asiaPromotion) promotionsLength += 1;
//     if (promotionsLength === 0) return <View style={{ height: screen.distance.smaller }} />;

//     return (
//       <View>
//         <TouchableOpacity
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingVertical: screen.distance.smaller,
//             paddingHorizontal: screen.distance.smaller
//           }}
//           onPress={this.togglePromotions}
//         >
//           <Text style={[textStyles.subheading, { color: colors.clearBlue }]}>{promotionsLength} CTKM đang áp dụng</Text>
//           <Icon name="chevron-right" size={scale(16)} color={colors.clearBlue} />
//         </TouchableOpacity>
//         <Collapsible
//           collapsed={this.state.collapsed}
//           style={{
//             backgroundColor: colors.paleGrey,
//             borderTopWidth: 0.5,
//             borderColor: colors.paleLilac
//           }}
//         >
//           <AsiaPromotion
//             asiaPromotion={asiaPromotion}
//             currentStore={this.props.currentStore}
//             detailList={this.props.detailList}
//             loadGiftDetail={this.props.loadGiftDetail}
//           />
//           {this.state.productPromotions
//             ? this.state.productPromotions.map((promotion, index) => (
//                 <View key={String(index)}>{this.renderProductPromotion(promotion)}</View>
//               ))
//             : null}
//         </Collapsible>
//       </View>
//     );
//   };

//   renderOnlyChosenBenefit = () => {
//     return <View />;
//   };

//   renderProductPromotionInDetail = () => {
//     let { productPromotions } = this.state;
//     let noPromotion = productPromotions.find(promotion => promotion.promotionFrom === 'none');
//     let realProductPromotions = productPromotions.filter(promotion => promotion.promotionFrom !== 'none');

//     return (
//       <View style={styles.promotionsContainer}>{this.renderRealProductPromotions(realProductPromotions, noPromotion)}</View>
//     );
//   };

//   onClose = () => this.setState({ showPromotions: false });

//   renderRealProductPromotions = (realProductPromotions, noPromotion) => {
//     if (realProductPromotions.length === 0) {
//       return null;
//     }
//     let content = realProductPromotions
//       .map((promotion, index) => <View key={index}>{this.renderProductPromotion(promotion, true)}</View>)
//       .filter(it => it);

//     return (
//       <View
//         style={{
//           backgroundColor: colors.orangeyRed,
//           padding: scale(12)
//         }}
//       >
//         <TouchableOpacity onPress={this.onToggleShowPromotions} style={styles.promotionTitle}>
//           <Text style={[textStyles.body1, { color: 'white', flex: 1, textAlignVertical: 'center' }]}>Chọn khuyến mãi</Text>
//           <Icon name="chevron-right" type="material-community" size={scale(24)} color={'white'} />
//         </TouchableOpacity>
//         <View
//           style={{
//             backgroundColor: 'white',
//             borderRadius: scale(8),
//             overflow: 'hidden',
//             marginVertical: content.length === 0 ? 0 : screen.distance.smaller
//           }}
//         >
//           {content}
//         </View>

//         <ChoosePromotionsModal visible={this.state.showPromotions} onClose={this.onClose}>
//           <View>
//             {this.renderProductPromotion({ ...noPromotion, name: 'Không sử dụng khuyến mãi' })}
//             {realProductPromotions.map(promotion => (
//               <View key={promotion.key}>{this.renderProductPromotion(promotion)}</View>
//             ))}
//           </View>
//         </ChoosePromotionsModal>
//       </View>
//     );
//   };

//   render() {
//     if (this.props.hostScreen === 'cart') {
//       return this.renderProductPromotionInCartItem();
//     } else {
//       return this.renderProductPromotionInDetail();
//     }
//   }
// }

// function mapStateToProps(state) {
//   let { cartList, cartIndex, cartStoreId } = state.cart;
//   let currentCart = utils.getCurrentCart(cartList, cartStoreId, cartIndex);
//   let currentStore = state.shops.shopsList.find(e => e.shop_id === state.user.profile.default_shop);
//   let { servicesSku } = state.product;

//   return {
//     servicesSku,
//     currentCart,
//     currentStore,
//     currentStoreId: cartStoreId,
//     detailList: state.product.detailList,
//     promotions: state.firebase.promotions,
//     promotionProducts: state.promotions.promotionProducts
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     loadGiftDetail: giftSku => dispatch(ProductActions.loadGiftDetail(giftSku))
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProductPromotion);

// const styles = StyleSheet.create({
//   promotionsContainer: {
//     flex: 1
//   },
//   promotionDetail: {
//     backgroundColor: colors.paleGrey
//   },
//   promotionContainer: {
//     borderBottomWidth: 0.5,
//     borderColor: colors.paleLilac
//   },
//   originalPrice: {
//     color: 'gray',
//     fontSize: screen.common.fontSize,
//     fontWeight: 'bold',
//     textDecorationLine: 'line-through'
//   },
//   promotionTitle: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   }
// });
