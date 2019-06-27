import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation';

import CartStackNavigator from './CartStackNavigator';

import DrawerMenu from './DrawerMenu';

import { scale } from '../styles';

const MainDrawerNavigator = createDrawerNavigator(
  {
    CartStack: CartStackNavigator
  },
  {
    initialRouteName: 'CartStack',
    backBehaviour: 'none',
    contentComponent: props => <DrawerMenu drawItems={props} navigation={props.navigation} />,
    drawerWidth: () => scale(300)
  }
);

export default MainDrawerNavigator;
