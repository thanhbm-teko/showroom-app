// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import { screen, colors, scale } from '../../styles';

// export class CartInvoice extends React.Component {
//   state = {
//     isEditCartList: false
//   };

//   render() {
//     const { invoiceWithoutPromotion, totalCartDiscount, voucherDiscount, invoice, appliedVoucher } = this.props;
//     let useVoucherLater = appliedVoucher && appliedVoucher.hasUseLater;
//     let voucherCode = this.state.voucherCode;

//     return (
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss} activeOpacity={1.0}>
//         <View style={styles.container}>
//           <View style={styles.priceRow}>
//             <Text style={[textStyles.body1Regular]}>Tổng tiền:</Text>
//             <Text style={textStyles.body1Regular}>{utils.formatPrice(invoiceWithoutPromotion)}</Text>
//           </View>
//           <View style={styles.priceRow}>
//             <Text style={[textStyles.body1Regular, { color: colors.clearBlue }]}>Giảm giá / Ưu đãi:</Text>
//             <Text style={[textStyles.body1Regular, { color: colors.clearBlue }]}>
//               {utils.formatPrice(totalCartDiscount)}
//               {' / '}
//               {useVoucherLater ? '(dùng sau)' : utils.formatPrice(voucherDiscount)}
//             </Text>
//           </View>
//           <View style={styles.priceRow}>
//             <Text style={[textStyles.body1, { color: colors.brightOrange }]}>
//               {voucherDiscount > 0 ? 'Còn phải thu:' : 'Thành tiền:'}
//             </Text>
//             <Text style={[textStyles.heading1, { color: colors.brightOrange }]}>{utils.formatPrice(invoice)}</Text>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     );
//   }
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
// )(CartInvoice);

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     borderBottomColor: colors.paleLilac,
//     borderBottomWidth: 0.5,
//     padding: screen.distance.smaller
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   voucherInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: screen.distance.smaller,
//     borderBottomColor: colors.paleLilac,
//     borderBottomWidth: 0.5
//   }
// });
