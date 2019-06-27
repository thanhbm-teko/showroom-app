import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
import HeaderIcon from '../../components/header/HeaderIcon';
import PriceFilterItem from './PriceFilterItem';
import PromoFilterItem from './PromoFilterItem';
import SortPriceItem from './SortPriceItem';

import { screen, colors } from '../../styles';

import * as searchProductActions from '../../reduxConnector/searchProduct/actions';

export class ProductCategoryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    categorySelectModalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={{ flex: 1 }}>
          {this.renderFilter()}
          {this.renderCategoryBar()}
          {this.renderProductListSection()}
          {/* <ChooseCategoryModal
            visible={this.state.categorySelectModalVisible}
            onClose={() => this.setState({ categorySelectModalVisible: false })}
            onSelectDone={data => this.onSelectDone(data)}
          />
          <FilterModal
            setInitValue={this.setInitValue}
            onSubmitFilter={this.onSubmitFilter}
            visible={this.state.isFilterVisible}
            onClose={this.toggleFilter}
            clearFilter={this.clearFilter}
            price
            sortByPrice
            promotion
          /> */}
          {this.renderSlideUpPanel()}
        </View>
      </View>
    );
  }

  renderHeader() {
    return (
      <Header
        containerStyle={{ backgroundColor: colors.darkGreyBlue }}
        leftSection={<HeaderIcon type="material-community" name="arrow-left" onPressIcon={this.onBackPressed} />}
        rightSection={<HeaderIcon type="material" name="filter-list" onPressIcon={this.toggleFilter} />}
        renderSearch={
          <View style={styles.searchBarContainer}>
            <Icon name="search" size={scale(20)} color={colors.brightOrange} />
            <TextInput
              style={[textStyles.body1Regular, { flex: 1, paddingLeft: scale(4), height: scale(32) }]}
              placeholder="Tên sản phẩm hoặc SKU..."
              underlineColorAndroid={'transparent'}
              onChangeText={this.onChangeText}
              value={this.state.searchText}
              placeholderTextColor={'#b0b0b0'}
              clearButtonMode={'always'}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize={'none'}
              selectionColor={colors.reddishOrange}
            />
            <Icon
              type="material-community"
              name="close-circle"
              size={scale(18)}
              color={colors.cloudyBlue}
              onPress={this.clearText}
            />
          </View>
        }
      />
    );
  }

  renderFilter = () => {
    let filter = {};
    return (
      <View style={styles.filterContainer}>
        {(filter.price.from != -1 || filter.price.to != -1) && (
          <PriceFilterItem
            minPrice={filter.price.from}
            maxPrice={filter.price.to}
            onPress={() => {
              this.props.updateCatFilterPrice({ from: -1, to: -1 });
              this.props.fetchProducts(this.props.currentSubcategory.code, this.state.searchText);
            }}
          />
        )}
        {filter.promotion.contain && (
          <PromoFilterItem
            onPress={() => {
              this.props.updateCatFilterPromotion(false, this.props.searchText);
              this.props.fetchProducts(this.props.currentSubcategory.code, this.state.searchText);
            }}
          />
        )}
        {filter.sort && (
          <SortPriceItem
            onPress={() => {
              this.props.updateCatFilterSort(undefined, this.props.searchText);
              this.props.fetchProducts(this.props.currentSubcategory.code, this.state.searchText);
            }}
            sort={filter.sort}
          />
        )}
      </View>
    );
  };

  renderCategoryBar() {
    return (
      <View style={styles.categoryBar}>
        <CategoryList selectedCategories={this.state.selectedCategories} clearSearchText={this.clearText} />
        <View style={styles.addCategoryBtnContainer} />
        <TouchableOpacity onPress={() => this.setState({ dialogVisible: true })} style={styles.addCategoryBtn}>
          <Icon type="material-icon" name="add-circle" color={'white'} size={scale(24)} />
        </TouchableOpacity>
      </View>
    );
  }

  renderProductListSection = () => {
    if (this.props.categories.data.length == 0) return null;
    return (
      <View style={{ flex: 1 }}>
        <SubCategoryList />
        <View style={{ flex: 1 }}>
          <ProductListContainer navigation={this.props.navigation} onPress={this.onPress} searchText={this.state.searchText} />
        </View>
      </View>
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
)(ProductCategoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paleGrey
  },
  categoryBar: {
    backgroundColor: 'white',
    height: scale(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  addCategoryBtnContainer: {
    width: scale(58),
    height: scale(26),
    backgroundColor: colors.brightOrange,
    shadowColor: 'rgba(255,93,23,0.3)',
    shadowOffset: {
      width: -4,
      height: 0
    },
    position: 'absolute',
    top: scale(13),
    right: 0,
    shadowRadius: 8,
    shadowOpacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: scale(13),
    borderBottomLeftRadius: scale(13),
    transform: [{ scaleY: 2.5 }]
  },
  addCategoryBtn: {
    width: scale(46),
    height: scale(52),
    marginRight: scale(4),
    backgroundColor: colors.brightOrange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBarContainer: {
    flex: 1,
    paddingHorizontal: screen.distance.default,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(8)
  },
  filterContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGreyBlue
  }
});
