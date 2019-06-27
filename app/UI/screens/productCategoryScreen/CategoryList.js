import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import CategoryItem from './CategoryItem';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleState: null
    };
  }

  renderItem = ({ item, index }) => {
    return (
      <CategoryItem
        item={item}
        onPress={() => this.onPressCategory(item)}
        isChoose={item.code == this.props.currentCategory.code}
      />
    );
  };

  renderError = () => {
    if (this.props.categories.error) {
      return (
        <View>
          <Text>Đã có lỗi xảy ra</Text>
          <TouchableOpacity onPress={() => this.fetchCategories()}>
            <Text>Thử lại</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderLoading = () => {
    if (this.props.categories.isLoading)
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      );
  };

  onPressCategory = category => {
    this.props.clearSearchText();
    this.props.setCategory(category);
  };

  render() {
    if (this.props.isError) {
      return (
        <View>
          <Text>Đã có lỗi xảy ra</Text>
          <TouchableOpacity onPress={() => this.fetchCategories()}>
            <Text>Thử lại</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (this.props.isLoading)
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      );
    return (
      <FlatList
        data={this.props.selectedCategories}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index + item.code}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        extraData={this.props.currentCategory.code}
        keyboardShouldPersistTaps={'always'}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isError: state.product.categories.error,
    isLoading: state.product.categories.isLoading,
    currentCategory: state.product.currentCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCategory: payload => dispatch(ProductActions.setCategory(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
