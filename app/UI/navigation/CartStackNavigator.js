import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import ProductSearchScreen from '../screens/productSearchScreen';
import ProductDetailScreen from '../screens/productDetailScreen';
import CartScreen from '../screens/cartScreen';

const CartStackNavigator = createStackNavigator(
  {
    Cart: CartScreen,
    ProductSearch: ProductSearchScreen,
    ProductDetail: ProductDetailScreen
  },
  {
    initialRouteName: 'Cart'
  }
);

export default CartStackNavigator;
