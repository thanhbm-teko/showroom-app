import React, { Component } from 'react';
import { View } from 'react-native';

import { screen, scale } from '../../styles';

const PickerPan = () => (
  <View
    style={{
      justifyContent: 'center',
      width: scale(40),
      height: scale(5),
      opacity: 0.3,
      marginBottom: scale(8),
      marginLeft: screen.width / 2 - scale(20),
      borderRadius: scale(3),
      backgroundColor: 'white'
    }}
  />
);

export default PickerPan;
