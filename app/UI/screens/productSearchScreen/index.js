import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from '../../components/header/SearchBar';
import HeaderIcon from '../../components/header/HeaderIcon';
import SearchingItem from './SearchingItem';

import { screen, colors } from '../../styles';

import * as searchProductActions from '../../reduxConnector/searchProduct/actions';

export class ProductSearchScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          initialSearchWidth={screen.width * 0.6}
          onBack={this.onBackPressed}
          rightButton={<HeaderIcon type="material" name="filter-list" size={screen.iconSize.medium} onPressIcon={() => {}} />}
          onSearchTextChange={this.onSearchTextChange}
        />
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={this.props.searchProductData.results}
            extraData={this.props}
            renderItem={this.renderItem}
            keyboardShouldPersistTaps="always"
            initialNumToRender={10}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMoreProduct}
            removeClippedSubviews={true}
            keyExtractor={item => item.sku}
          />
        </View>
      </View>
    );
  }

  renderItem = ({ item, index }) => {
    return (
      <SearchingItem
        key={item.sku}
        index={index}
        item={item}
        onPress={this.goToDetail}
        getStockQty={this.getStockQty}
        checkPromotion={this.checkPromotion}
      />
    );
  };

  onSearchTextChange = text => {
    this.props.searchProduct(text);
  };

  loadMoreProduct = () => {
    this.props.searchMoreProduct();
  };

  toggleFilter = () => {};

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  goToDetail = (item, index) => {
    this.props.navigation.navigate('ProductDetail', { sku: item.sku });
  };

  getStockQty = item => {};

  checkPromotion = item => {};
}

function mapStateToProps(state) {
  return {
    searchProductData: state.searchProduct
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchProduct: query => dispatch(searchProductActions.searchProduct(query)),
    searchMoreProduct: () => dispatch(searchProductActions.searchMoreProduct())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paleGrey
  }
});
