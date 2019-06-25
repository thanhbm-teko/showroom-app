// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import { screen, colors, fonts } from '../../styles';

// export class CustomerQuickInfo extends React.Component {
//   state = {
//     buyerTelephone: '',
//     buyerName: '',
//     isCustomerFound: false
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.inputSearchPhone}>
//           <Icon name="cellphone" type="material-community" size={scale(20)} color={colors.darkGray} />
//           <TextInput
//             style={[fonts.body1Regular, { paddingLeft: screen.distance.default, flex: 1, textAlignVertical: 'center' }]}
//             keyboardType="numeric"
//             onChangeText={text => {
//               this.setState({
//                 buyerTelephone: text
//               });
//             }}
//             onEndEditing={() => {
//               this.findCustomer(this.state.buyerTelephone);
//             }}
//             value={this.state.buyerTelephone}
//             placeholderTextColor={colors.steel}
//             placeholder="Số điện thoại"
//             underlineColorAndroid="rgba(0,0,0,0)"
//           />
//           {this.state.isCustomerFound ? (
//             <Icon
//               type="material-community"
//               name="format-list-bulleted"
//               color={colors.brightOrange}
//               size={scale(20)}
//               onPress={this.openCustomerOrders}
//             />
//           ) : null}
//         </View>
//         <View style={[styles.inputSearchPhone, { borderLeftWidth: 0.5, borderColor: colors.paleLilac }]}>
//           <Icon name="account" type="material-community" size={scale(20)} color={colors.darkGray} />
//           <TextInput
//             style={[
//               fonts.body1Regular,
//               {
//                 color: colors.darkGreyBlue,
//                 paddingLeft: screen.distance.default,
//                 flex: 1,
//                 textAlignVertical: 'center'
//               }
//             ]}
//             placeholderTextColor={colors.steel}
//             onChangeText={text => {
//               this.setState({
//                 buyer_name: text
//               });
//             }}
//             value={this.state.buyer_name}
//             placeholder="Tên KH"
//             underlineColorAndroid="rgba(0,0,0,0)"
//           />
//         </View>
//       </View>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     searchProductData: state.searchProduct
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     searchProduct: query => dispatch(searchProductActions.searchProduct(query)),
//     searchMoreProduct: () => dispatch(searchProductActions.searchMoreProduct())
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CustomerQuickInfo);

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 0,
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     borderTopWidth: 0.5,
//     borderColor: colors.paleLilac
//   },
//   inputSearchPhone: {
//     flex: 1,
//     paddingLeft: screen.distance.smaller,
//     paddingRight: screen.distance.default,
//     flexDirection: 'row',
//     height: scale(44),
//     borderBottomWidth: 0.5,
//     borderColor: colors.paleLilac,
//     alignItems: 'center'
//   }
// });
