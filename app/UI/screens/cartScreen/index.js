import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import CartList from './CartList';
import SearchHeader from './SearchHeader';
import CustomerQuickInfo from './CustomerQuickInfo';
import VoucherInput from './VoucherInput';
import CartInvoice from './CartInvoice';
import CartContent from './CartContent';
import BottomButtons from './BottomButtons';

import CART_FIXTURE from './fixture.json';

export class CartScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let hasCart = this.props.cartData.carts.length > 0;

    return (
      <View style={styles.container}>
        <SearchHeader navigation={this.props.navigation} />
        {hasCart ? <CartList /> : null}
        {hasCart ? <CustomerQuickInfo /> : null}
        {hasCart ? <VoucherInput /> : null}
        {hasCart ? <CartInvoice /> : null}
        <CartContent />
        {hasCart ? <BottomButtons /> : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartData: state.cart
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
