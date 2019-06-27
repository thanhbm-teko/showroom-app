import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

import { screen, colors, fonts, scale } from '../../styles';

export default class SearchHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          accessibilityLabel="cart_container_drawer_toggle"
          style={styles.btn1}
          onPress={() => {
            Keyboard.dismiss();
            this.props.navigation.openDrawer();
          }}
        >
          <Icon type="material-community" name="menu" size={screen.iconSize.normal} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="cart_container_search"
          onPress={() => this.props.navigation.navigate('ProductSearch')}
          activeOpacity={1.0}
          style={styles.btn2}
        >
          <Icon name="search" size={scale(20)} color={colors.cloudyBlue} />
          <Text style={[fonts.body1Regular, styles.searchBoxText]}>Tên sản phẩm hoặc SKU...</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="cart_container_category"
          style={styles.btn3}
          onPress={() => this.props.navigation.navigate('Category')}
        >
          <Icon type="material-community" name="format-list-bulleted" color={'white'} size={screen.iconSize.normal} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="cart_container_scan_qrcode"
          style={styles.btn3}
          onPress={() => this.props.navigation.navigate('BarCodeScanner')}
        >
          <Icon type="material-icon" name="center-focus-weak" color={'white'} size={screen.iconSize.normal} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: scale(48) + screen.header.statusBarHeight,
    backgroundColor: colors.darkGreyBlue,
    paddingTop: screen.header.statusBarHeight
  },
  searchBoxText: {
    flex: 1,
    color: colors.steel,
    paddingLeft: scale(4),
    paddingVertical: scale(6)
  },
  btn1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: screen.distance.smaller
  },
  btn2: {
    flex: 1,
    height: scale(32),
    paddingHorizontal: screen.distance.default,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(8)
  },
  btn3: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: screen.distance.smaller,
    paddingRight: screen.distance.smaller / 2
  }
});
