// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import ProductInCart from './ProductInCart';
// import { screen, colors, fonts, scale } from '../../styles';

// export class CartContent extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         {currentCart ? (
//           <View style={{ flex: 1 }}>
//             <ScrollView>
//               {productInProcess.map((item, index) => this.renderProductSaleItem({ item, index }))}
//               {this.renderCartAdjustButton()}
//             </ScrollView>
//           </View>
//         ) : (
//           this.renderEmptyCart()
//         )}
//       </View>
//     );
//   }

//   renderProductSaleItem = ({ item, index }) => {
//     let { state } = this.props.navigation;
//     let returnOrder = state && state.params && state.params.returnOrder ? state.params.returnOrder : false;
//     return (
//       <ProductInCart
//         key={item.uuid}
//         item={item}
//         targetCart={this.props.currentCart}
//         returnOrder={returnOrder}
//         onPress={this.goToDetail}
//         navigation={this.props.navigation}
//         onSelectTextInput={this.onSelectTextInput}
//       />
//     );
//   };

//   renderEmptyCart() {
//     return (
//       <View style={styles.emptyCart}>
//         <Text style={[fonts.body1Regular, { marginBottom: scale(179), color: colors.darkGray }]}>Không có đơn hàng nào!</Text>
//         <Button
//           title={'Tạo đơn hàng'}
//           color={colors.brightOrange}
//           textStyle={[fonts.heading1, { color: 'white' }]}
//           onPress={this.onAddNewCart}
//           containerStyle={styles.createCartBtn}
//           iconName="add-circle"
//           iconType="material-icon"
//           iconColor="white"
//           iconSize={scale(20)}
//         />
//         <Button
//           title={'Tạo combo'}
//           color={'white'}
//           textStyle={[fonts.heading1, { color: colors.darkGreyBlue }]}
//           onPress={this.goToComboList}
//           containerStyle={styles.createComboBtn}
//           iconName="playlist-add"
//           iconType="material-icon"
//           iconColor={colors.brightOrange}
//           iconSize={scale(20)}
//         />
//       </View>
//     );
//   }

//   renderCartAdjustButton = () => {
//     let readyToOrder = true;

//     if (readyToOrder) {
//       return (
//         <View style={styles.gotoCartAdjustContainer}>
//           <TouchableOpacity
//             testID={'cart_container_adjust_promotions'}
//             onPress={() => this.onContinueHandleCart(true)}
//             style={styles.gotoCartAdjustBtn}
//           >
//             <Text style={[fonts.subheading, { color: 'white', fontFamily: 'sale-text-medium' }]}>Xin quà/giảm giá</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }
//     return null;
//   };
// }

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {};
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CartContent);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.paleGrey
//   },
//   createCartBtn: {
//     width: scale(255),
//     height: scale(50),
//     borderRadius: scale(8),
//     marginBottom: screen.distance.small
//   },
//   createComboBtn: {
//     width: scale(255),
//     height: scale(50),
//     borderRadius: scale(8),
//     marginBottom: scale(80)
//   },
//   gotoCartAdjustContainer: {
//     marginVertical: scale(10),
//     paddingVertical: screen.distance.default,
//     paddingHorizontal: screen.distance.smaller,
//     backgroundColor: 'white',
//     borderColor: colors.paleLilac,
//     borderTopWidth: 0.5,
//     borderBottomWidth: 0.5
//   },
//   gotoCartAdjustBtn: {
//     backgroundColor: colors.clearBlue,
//     paddingVertical: screen.distance.default,
//     alignItems: 'center',
//     borderRadius: scale(8)
//   }
// });
