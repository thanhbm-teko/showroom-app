import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import CartList from './CartList';
import SearchHeader from './SearchHeader';
import CustomerQuickInfo from './CustomerQuickInfo';
import VoucherInput from './VoucherInput';
import CartInvoice from './CartInvoice';
import CartContent from './CartContent';

import * as cartActions from '../../reduxConnector/cart/actions';

import CART_FIXTURE from './fixture.json';

export class CartScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchHeader />
        <CartList />
        <CustomerQuickInfo />
        <VoucherInput />
        <CartInvoice />
        <CartContent />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartData: CART_FIXTURE
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCart: () => dispatch(cartActions.addCart()),
    deleteCart: cartId => dispatch(cartActions.deleteCart(cartId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
