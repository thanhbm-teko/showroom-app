import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { fonts, screen, colors, scale } from '../styles';

export class DrawerMenu extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có muốn đăng xuất khỏi hệ thống?',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Có',
          onPress: () => this.props.logOut(this.onLogoutResult.bind(this))
        }
      ],
      { cancelable: false }
    );
  };

  onLogoutResult() {
    RootNavigationService.dispatch(resetToLogin());
  }

  goToNotifications = () => {
    this.props.navigation.navigate('NotificationList');
  };

  goToConfirmCart = () => {
    this.props.navigation.navigate('Order', {}, resetToOrderList(0));
  };

  goToQuotation = () => {
    this.props.navigation.navigate('Quotation');
  };

  goToPromotions = () => {
    this.props.navigation.navigate('Promotion');
  };

  goToSalesman = () => {
    this.props.navigation.navigate('Salesman');
  };

  onChangeTypeSearch = () => {
    this.props.changeTypeSearch();
  };

  gotoChooseShop = () => {
    this.props.navigation.navigate('Shop');
  };

  goToSalesInfo = () => {
    this.props.navigation.navigate('SalesInfo');
  };

  goToBuilder = () => {
    this.props.navigation.navigate('Builder');
  };

  getDefaultTime = () => {
    let d = new Date();
    let n = d.getTime();
    return new Date(n + 3600000);
  };

  goToViewSaleDiscountStore = () => {
    let { navigation } = this.props;
    navigation.navigate('ReviewDiscount');
  };

  renderDrawerItem = (icon, title, onPress, accessibilityLabel, inVisible = false) => {
    if (inVisible) {
      return null;
    }
    return (
      <TouchableOpacity accessibilityLabel={accessibilityLabel} style={styles.drawerItems} onPress={onPress}>
        <Icon type={icon.type || 'material'} name={icon.name || icon} size={scale(24)} color={colors.reddishOrange} />
        <Text style={[fonts.body1Regular, { marginLeft: screen.distance.small }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  renderHeaderDrawer = () => {
    let { user } = this.props;
    return (
      <View
        style={{
          backgroundColor: colors.darkGreyBlue,
          alignItems: 'center',
          padding: screen.distance.small,
          flexDirection: 'row',
          paddingTop: screen.distance.small + screen.header.statusBarHeight
        }}
      >
        <Image
          source={{ uri: user && user.userInfo.photoURL }}
          style={{ width: scale(48), height: scale(48), borderRadius: scale(24) }}
        />
        <View style={{ marginLeft: scale(12), flex: 1 }}>
          <Text style={[fonts.heading2, { color: 'white' }]}>{user && user.userInfo.displayName}</Text>
          <Text style={[fonts.subheading, { color: colors.steel }]} numberOfLines={3}>
            {this.props.currentStore && this.props.currentStore.profile.name}
          </Text>
          <Text style={[fonts.subheading, { color: colors.steel }]}>Version: {this.props.appVersion}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderHeaderDrawer()}
        <ScrollView>
          <View style={{ height: screen.distance.default }} />
          {this.renderDrawerItem(
            { name: 'bell', type: 'material-community' },
            'Thông báo',
            this.goToNotifications,
            'drawer_menu_notification'
          )}
          {this.renderDrawerItem('receipt', 'Quản lý đơn hàng', this.goToConfirmCart, 'drawer_menu_confirmed_order')}
          {this.renderDrawerItem(
            { name: 'wrench', type: 'material-community' },
            'Build PC',
            this.goToBuilder,
            'drawer_menu_build_pc'
          )}
          {this.renderDrawerItem('whatshot', 'Chương trình khuyến mãi', this.goToPromotions, 'drawer_menu_promotion')}
          {this.renderDrawerItem('account-circle', 'Salesman', this.goToSalesman, 'drawer_menu_salesman')}
          {this.renderDrawerItem('store', 'Chọn cửa hàng', this.gotoChooseShop, 'drawer_menu_choose_shop')}
          {this.renderDrawerItem('trending-up', 'Báo cáo', this.goToSalesInfo, 'drawer_menu_sale_info')}

          {this.renderDrawerItem(
            {
              name: 'tag',
              type: 'material-community'
            },
            'Giảm giá tháng',
            this.goToViewSaleDiscountStore,
            'drawer_menu_review_discount'
          )}
        </ScrollView>
        {this.renderDrawerItem(
          {
            name: 'login-variant',
            type: 'material-community'
          },
          'Đăng xuất',
          this.logOut,
          'drawer_menu_drawer_menu_logout'
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerMenu);

const styles = StyleSheet.create({
  drawerItems: {
    flexDirection: 'row',
    height: scale(48),
    paddingHorizontal: screen.distance.small,
    paddingVertical: screen.distance.smaller,
    alignItems: 'center'
  }
});
