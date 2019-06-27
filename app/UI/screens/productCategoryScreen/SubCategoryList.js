import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import SubcategoryItem from './SubcategoryItem';
import { screen, colors } from '../../styles';

class SubCategoryList extends Component {
  constructor(props) {
    super(props);
  }

  renderSubcategoryItem = ({ item, index }) => {
    return (
      <SubcategoryItem
        item={item}
        onPress={() => this.onPressSubCategory(item)}
        isChoose={item.code == this.props.currentSubcategory.code}
      />
    );
  };

  onPressSubCategory = category => {
    this.props.setSubcategories(category, this.props.searchText);
  };

  render() {
    if (this.props.subCategories && this.props.subCategories.length == 0) return null;
    return (
      <View style={{ padding: screen.distance.default, backgroundColor: colors.paleGrey }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={this.props.subCategories}
          renderItem={this.renderSubcategoryItem}
          keyExtractor={item => item.code}
          showsVerticalScrollIndicator={false}
          extraData={this.props.currentSubcategory.code}
          keyboardShouldPersistTaps={'always'}
          horizontal={true}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    subCategories: state.product.subCategories,
    currentSubcategory: state.product.currentSubcategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSubcategories: (sub, text) => dispatch(ProductActions.setSubcategories(sub, text))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCategoryList);

const styles = StyleSheet.create({
  textStyle: {
    color: 'orange'
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
