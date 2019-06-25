// import React, { Component } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
// import { Icon } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { isEmpty } from 'lodash';

// import { screen, colors } from '../../styles';
// import * as util from '../../util';

// import ColoredTextLabel from '../components/label/ColoredTextLabel';
// import ChangeQuantityItem from '../components/common/ChangeQuantityItem';

// export class ProductInCart extends Component {
//   state = {
//     recentQuantity: 0
//   };

//   renderPrice = () => {
//     let discount = 10000;
//     let price = 200000;

//     return (
//       <View style={{ alignItems: 'flex-end', padding: screen.distance.smaller, paddingLeft: screen.distance.small }}>
//         {discount > 0 ? (
//           <Text style={[fonts.subheading, { textDecorationLine: 'line-through', marginLeft: screen.distance.default }]}>
//             {util.formatPrice(price)}
//           </Text>
//         ) : null}
//         <Text style={[fonts.heading1, { color: colors.brightOrange }]}>
//           {this.props.servicesSku.indexOf(sku) < 0 ? util.formatPrice(price - discount) : util.formatPrice(price)}
//         </Text>
//       </View>
//     );
//   };

//   renderProductInfo = () => {
//     let { item, changeProductSale } = this.props;
//     let { productDetailAsia } = this.state;
//     return (
//       <View style={{ marginTop: scale(10), borderColor: colors.paleLilac, borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
//         <TouchableOpacity style={styles.container} onPress={this.goToDetail}>
//           <View style={{ flex: 1 }}>
//             <View style={{ padding: screen.distance.smaller, paddingBottom: 0 }}>
//               <Text style={[fonts.heading1, { flex: 1 }]}>{productDetailAsia.name}</Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 marginTop: screen.distance.default,
//                 paddingHorizontal: screen.distance.smaller
//               }}
//             >
//               <ColoredTextLabel text={`#${item.sku}`} type="success" />
//               <ColoredTextLabel text={`BH ${item.warranty || 0} tháng`} type="orange" style={{ marginLeft: scale(4) }} />
//             </View>
//           </View>
//           {this.renderPrice()}
//         </TouchableOpacity>
//         <View style={{ backgroundColor: 'white' }}>{this.renderPromotion()}</View>
//         <View style={styles.border} />
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
//           <TouchableOpacity
//             style={{
//               marginLeft: screen.distance.smaller,
//               marginVertical: scale(14),
//               flexDirection: 'row',
//               alignItems: 'center'
//             }}
//             onPress={() => changeProductSale(item.uuid, item.sku, 0, item.promotion)}
//           >
//             <Icon type="ionicon" name="md-trash" size={scale(24)} color={colors.cloudyBlue} />
//             <Text style={[fonts.subheading, { marginLeft: scale(7), color: colors.steel }]}>Xoá</Text>
//           </TouchableOpacity>
//           <ChangeQuantityItem
//             quantity={item.quantity}
//             maxQuantity={999}
//             onFocus={() => this.onFocus(item.quantity)}
//             onUpdateQuantity={this.onEndEditing}
//             style={{ margin: screen.distance.smaller, marginLeft: screen.distance.small }}
//           />
//         </View>
//       </View>
//     );
//   };

//   renderProductHasNoInfo() {
//     let { item, changeProductSale } = this.props;

//     return (
//       <View style={styles.noInfoContainer}>
//         <View style={{ flexDirection: 'row' }}>
//           <Text style={[styles.textStyle, { flex: 1 }]}>Không có thông tin sản phẩm</Text>
//           <TouchableOpacity
//             style={{ flexDirection: 'column', justifyContent: 'flex-start' }}
//             onPress={() => changeProductSale(item.uuid, item.sku, 0, item.promotion, item.overlapPromotions)}
//           >
//             <Icon type="material-community" name="close" size={scale(25)} color={colors.lightBlueGrey} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   render() {
//     if (!this.state.productDetailAsia) {
//       return (
//         <View style={styles.container}>
//           <ActivityIndicator />
//         </View>
//       );
//     } else if (isEmpty(this.state.productDetailAsia)) {
//       return this.renderProductHasNoInfo();
//     } else {
//       return this.renderProductInfo();
//     }
//   }
// }

// function mapStateToProps(state, props) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {};
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProductInCart);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     flexDirection: 'row'
//   },
//   border: {
//     borderColor: colors.paleLilac,
//     borderBottomWidth: StyleSheet.hairlineWidth
//   },
//   noInfoContainer: {
//     backgroundColor: '#ffffff',
//     padding: screen.padding,
//     marginBottom: screen.margin
//   },
//   textStyle: {
//     fontSize: screen.common.fontSize,
//     fontWeight: '600',
//     textAlignVertical: 'bottom'
//   }
// });
