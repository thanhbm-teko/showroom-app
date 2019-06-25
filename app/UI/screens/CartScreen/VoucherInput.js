// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import { screen, colors, scale, fonts } from '../../styles';

// export class VoucherInput extends React.Component {
//   state = {
//     voucherCode: ''
//   };

//   render() {
//     let voucherCode = this.state.voucherCode;

//     return (
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss} activeOpacity={1.0}>
//         <View style={styles.container}>
//           <View style={styles.textContainer}>
//             <Icon type="material-community" name="tag" size={scale(20)} color={colors.darkGray} />
//             <TextInput
//               value={voucherCode}
//               placeholder="Nhập mã giảm giá"
//               placeholderTextColor={colors.steel}
//               underlineColorAndroid="transparent"
//               style={[fonts.body1Regular, { marginLeft: screen.distance.default, flex: 1, textAlignVertical: 'center' }]}
//               onFocus={this.onFocusVoucherCode}
//               onChangeText={this.onChangeText}
//             />
//           </View>
//           <Button
//             title={'Áp dụng'}
//             color={colors.brightOrange}
//             textStyle={[fonts.heading1, { color: 'white' }]}
//             onPress={this.onSubmitVoucherCode}
//             containerStyle={styles.buttonContainer}
//           />
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
// )(VoucherInput);

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderBottomColor: colors.paleLilac,
//     borderBottomWidth: 0.5,
//     paddingLeft: screen.distance.smaller
//   },
//   textContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     marginRight: screen.distance.default
//   },
//   buttonContainer: {
//     borderRadius: scale(8),
//     justifyContent: 'center',
//     paddingHorizontal: screen.distance.smaller,
//     paddingVertical: screen.distance.default,
//     marginVertical: scale(4),
//     marginRight: screen.distance.default
//   }
// });
