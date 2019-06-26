import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';

import CustomerInfoScreen from '../screens/customerInfoScreen';
import ProductSearchScreen from '../screens/productSearchScreen';
import ProductDetailScreen from '../screens/productDetailScreen';
import CartScreen from '../screens/cartScreen';

import DrawerMenu from './DrawerMenu';

import { scale } from '../styles';

const MainDrawerNavigator = createDrawerNavigator(
  {
    Cart: CartScreen
  },
  {
    initialRouteName: 'Cart',
    backBehaviour: 'none',
    contentComponent: props => <DrawerMenu drawItems={props} navigation={props.navigation} />,
    drawerWidth: () => scale(300)
  }
);

export default MainDrawerNavigator;
