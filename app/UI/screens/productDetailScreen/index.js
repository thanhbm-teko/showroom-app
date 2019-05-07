import React, { Component } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/Header';
import HeaderIcon from '../../components/header/HeaderIcon';
import DetailComponent from '../../components/DetailComponent';
import * as utils from '../../utils';

export class ProductDetailContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
  }

  componentWillUnmount() {
    this.props.navigation.setParams({
      sku: null,
      cartItem: null,
      onCartPressed: null,
      defaultPromotion: null,
      ignoreCheckVoucher: null,
      from: null
    });
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  onBackPressed = () => {
    // let { key, purpose, status } = this.props.navigation.state.params;
    // if (
    //   this.props.navigation.state &&
    //   this.props.navigation.state.params &&
    //   typeof this.props.navigation.state.params.from === 'string'
    // ) {
    //   this.props.navigation.goBack(null);
    //   if (this.props.navigation.state.params.from !== 'Search') {
    //     if (this.props.navigation.state.params.from == 'CartAdjustPromotion') {
    //       this.props.navigation.navigate('OrderFirebaseDetail', {
    //         key,
    //         status,
    //         purpose
    //       });
    //     } else {
    //       this.props.navigation.navigate(this.props.navigation.state.params.from);
    //     }
    //   }
    // }

    this.props.navigation.goBack(null);
    return true;
  };

  render() {
    if (this.props.navigation.state && this.props.navigation.state.params) {
      let {
        cartItem,
        sku,
        index,
        onCartPressed,
        defaultPromotion,
        ignoreCheckVoucher,
        from
      } = this.props.navigation.state.params;
      return (
        <View style={styles.container}>
          {this.renderHeader()}
          <DetailComponent
            sku={sku}
            item={cartItem}
            index={index}
            cartItem={cartItem}
            navigation={this.props.navigation}
            hostScreen={from || 'Detail'}
            ignoreCheckVoucher={ignoreCheckVoucher}
            onCartPressed={onCartPressed}
            defaultPromotion={defaultPromotion}
          />
        </View>
      );
    }
  }

  renderHeader() {
    return (
      <Header
        title={'Chi tiết sản phẩm'}
        leftSection={
          <HeaderIcon
            accessibilityLabel="product_detail_container_go_back"
            type="evilicon"
            name="chevron-left"
            onPressIcon={() => this.onBackPressed()}
          />
        }
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    detailProduct: utils.getProduct(props.navigation.state.params.sku, state.products)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
});
