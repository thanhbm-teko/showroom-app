import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import StockModal from './StockModal';

import { fonts, screen, colors, scale } from '../../styles';

export default class StockInfo extends Component {
  state = {
    modalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderStockButton()}
        <StockModal
          visible={this.state.modalVisible}
          isUsingOM={this.props.isUsingOM}
          onClose={this.toggleStockDetail}
          data={this.props.stocks}
        />
      </View>
    );
  }

  renderStockButton() {
    return (
      <TouchableOpacity style={styles.stockButton} onPress={this.toggleStockDetail}>
        <Image source={require('../../../../assets/images/shop.png')} style={{ width: scale(24), height: scale(24) }} />
        <Text style={[fonts.body1, { marginLeft: scale(8), flex: 1 }]}>
          Tồn kho <Text style={fonts.body1Regular}> (Khả dụng/Thực tế)</Text>
        </Text>
        <Text style={[fonts.body1Regular, { color: colors.steel, marginRight: screen.distance.default }]}>
          <Text style={[fonts.body1, { color: colors.reddishOrange }]}>50</Text>
          /100
        </Text>
        <Icon name="chevron-right" type="material-community" size={scale(24)} color={colors.cloudyBlue} />
      </TouchableOpacity>
    );
  }

  toggleStockDetail = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
}

const styles = StyleSheet.create({
  stockButton: {
    flexDirection: 'row',
    height: scale(48),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screen.distance.smaller,
    marginTop: scale(10),
    backgroundColor: 'white',
    borderColor: colors.paleLilac,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5
  }
});
