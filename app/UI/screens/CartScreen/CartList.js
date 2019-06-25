import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { screen, colors, scale, fonts } from '../../styles';
import * as cartActions from '../../reduxConnector/cart/actions';

import CART_FIXTURE from './fixture.json';

export class CartList extends React.Component {
  state = {
    isEditCartList: false
  };

  render() {
    let { carts, selectedIdx } = this.props.cartData;
    if (carts.length > 0) {
      return (
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }} showsHorizontalScrollIndicator={false} horizontal={true}>
            {carts.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.onCartPressed(item)}
                style={[styles.cartItemContainer, selectedIdx === index && styles.selectedCartItem]}
              >
                <Text
                  style={[
                    fonts.body1Regular,
                    { color: selectedIdx === index ? 'white' : colors.darkGray, textAlignVertical: 'center' }
                  ]}
                >
                  {`Đơn ${index + 1}`}
                </Text>
                {this.state.isEditCartList ? (
                  <View style={[styles.btnContainer, { backgroundColor: selectedIdx === index ? 'white' : colors.orangeRed }]}>
                    <Icon
                      name="remove"
                      type="material-icon"
                      size={scale(12)}
                      color={selectedIdx === index ? colors.brightOrange : 'white'}
                    />
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </ScrollView>
          {this.state.isEditCartList ? (
            <TouchableOpacity style={styles.btnContainer} onPress={this.onEditCartList}>
              <Icon type="material-icon" name="check" color={'white'} size={scale(16)} />
            </TouchableOpacity>
          ) : null}
          {!this.state.isEditCartList ? (
            <TouchableOpacity style={styles.btnContainer} onPress={this.onEditCartList}>
              <Icon type="material-icon" name="edit" color={'white'} size={scale(16)} />
            </TouchableOpacity>
          ) : null}
          {!this.state.isEditCartList ? (
            <TouchableOpacity
              style={[
                styles.btnContainer,
                {
                  backgroundColor: colors.brightOrange
                }
              ]}
              onPress={this.onAddNewCart}
            >
              <Icon type="material-icon" name="add" color={'white'} size={scale(20)} />
            </TouchableOpacity>
          ) : null}
        </View>
      );
    }

    return null;
  }

  onEditCartList = () => {
    this.setState({ isEditCartList: !this.state.isEditCartList });
  };

  onAddNewCart = () => {
    this.props.addCart();
  };

  onCartPressed = item => {
    if (this.state.isEditCartList) {
      this.props.deleteCart(item.id);
    } else {
      this.props.selectCart(item.id);
    }
  };
}

function mapStateToProps(state) {
  return {
    cartData: state.cart.carts.length > 0 ? state.cart : CART_FIXTURE
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCart: () => dispatch(cartActions.addCart()),
    selectCart: cartId => dispatch(cartActions.selectCart(cartId)),
    deleteCart: cartId => dispatch(cartActions.deleteCart(cartId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.paleGrey,
    height: scale(50),
    flexDirection: 'row',
    padding: scale(8)
  },
  cartItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: scale(8),
    minWidth: scale(55),
    padding: scale(8),
    flexDirection: 'row',
    height: scale(32),
    backgroundColor: '#ffffff',
    marginRight: screen.distance.default
  },
  selectedCartItem: {
    backgroundColor: colors.brightOrange
  },
  btnContainer: {
    marginRight: scale(4),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGreyBlue
  }
});
