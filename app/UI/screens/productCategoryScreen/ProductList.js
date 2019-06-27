import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, BackHandler, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import SearchingItem from '../../components/product/SearchingItem';
import { screen } from '../../styles';

class ProductList extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
  }

  onBackPressed = () => {
    this.props.navigation.goBack(this.props.navigation.state.key);
    return true;
  };

  renderLoading = () => {
    if (this.props.productList && this.props.productList.isLoading)
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      );
  };

  renderError = () => {
    if (!this.props.productList.isLoading && this.props.productList.error) {
      return (
        <View style={styles.loadingWrapper}>
          <Text>Đã có lỗi xảy ra</Text>
          <TouchableOpacity>
            <Text>Thử lại</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <SearchingItem
        key={index}
        index={index}
        item={item}
        salemanConfig={this.props.firebaseConfig && this.props.firebaseConfig.saleman}
        onPress={this.goToDetail}
        getStockQty={this.getStockQty}
        checkPromotion={this.checkPromotion}
        getSalemanProgramValueForProduct={this.getSalemanProgramValueForProduct}
      />
    );
  };

  renderLoadingMore = () => {
    if (this.props.productList.isLoadingMore) {
      return (
        <View style={styles.loadMoreContainer}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return null;
    }
  };

  renderList = () => {
    let { productList, productVisibleFilter } = this.props;
    if (productList && Array.isArray(productList.data)) {
      //filter
      let { data } = productList;
      if (productVisibleFilter) {
        data = data.filter(e => productVisibleFilter(e));
      }

      if (data.length > 0) {
        return (
          <FlatList
            data={data}
            contentContainerStyle={{ backgroundColor: 'transparent' }}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={this.onEndReached}
            keyboardShouldPersistTaps={'always'}
            keyboardDismissMode={'on-drag'}
            ListFooterComponent={this.renderLoadingMore}
          />
        );
      } else if (data.length === 0) {
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>Không có sản phẩm phù hợp</Text>
          </View>
        );
      }
    }
  };

  onEndReached = () => {
    this.props.fetchMoreProducts(this.props.currentSubcategory.code, this.props.searchText);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderError()}
        {this.renderList()}
        {this.renderLoading()}
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
)(ProductList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  loadMoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: screen.padding
  }
});
