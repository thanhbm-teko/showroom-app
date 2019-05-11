import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, TextInput, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { fonts, colors, screen, scale } from '../../styles';

export default class SearchBar extends Component {
  state = {
    searchText: '',
    width: new Animated.Value(100),
    focusing: false
  };

  componentDidMount() {
    this.setState({ width: new Animated.Value(this.props.initialSearchWidth) }, () => {
      Animated.timing(this.state.width, {
        toValue: screen.width - screen.iconSize.medium - screen.distance.smaller * 4 - scale(26),
        duration: 500
      }).start(() => {
        this.textInput.focus();
        this.setState({ focusing: true });
      });
    });
  }

  onSearchTextChange = text => {
    this.setState({ searchText: text }, () => {
      this.props.onSearchTextChange(this.state.searchText);
    });
  };

  clearSearchText = () => {
    this.onSearchTextChange('');
  };

  onBack = () => {
    this.props.onBack();
  };

  render() {
    let { rightButton } = this.props;
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity
          accessibilityLabel="cart_container_drawer_toggle"
          style={styles.drawerToggleIcon}
          onPress={this.onBack}
        >
          <Icon name="arrow-left" type="material-community" size={screen.iconSize.medium} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Animated.View style={{ width: this.state.width }}>{this.renderSearchInput()}</Animated.View>
        </View>
        {this.state.focusing ? this.renderCancelText() : rightButton && rightButton}
      </View>
    );
  }

  renderSearchInput() {
    let { searchText } = this.props;
    return (
      <View style={styles.searchInput}>
        <Icon name="search" size={scale(20)} color={colors.reddishOrange} />
        <TextInput
          style={[fonts.body1Regular, { flex: 1, paddingLeft: scale(4), height: scale(32) }]}
          underlineColorAndroid={'transparent'}
          returnKeyType={'search'}
          autoCorrect={false}
          onChangeText={this.onSearchTextChange}
          value={searchText}
          placeholder={'Tên sản phẩm hoặc SKU...'}
          placeholderTextColor={'#b0b0b0'}
          ref={input => {
            this.textInput = input;
          }}
          selectionColor={colors.reddishOrange}
        />
        <Icon
          type="material-community"
          name="close-circle"
          size={scale(18)}
          color={colors.cloudyBlue}
          onPress={this.clearSearchText}
        />
      </View>
    );
  }

  onBlur = () => {
    this.textInput.blur();
    this.setState({ focusing: false });
  };

  renderCancelText = () => {
    return (
      <TouchableOpacity onPress={this.onBlur}>
        <Text style={[fonts.body1Regular, { color: 'white', padding: screen.distance.smaller }]}>Hủy</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.darkGreyBlue,
    paddingTop: screen.header.statusBarHeight
  },
  drawerToggleIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: screen.distance.smaller
  },
  searchInput: {
    paddingHorizontal: screen.distance.default,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(8)
  }
});
