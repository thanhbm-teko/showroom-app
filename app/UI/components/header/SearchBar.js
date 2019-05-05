import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, TextInput, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import { Sizes } from '../../styles/sizes';
import { scale } from '../../styles/scale';

export default class SearchBar extends Component {
  state = {
    searchText: '',
    width: new Animated.Value(100),
    focusing: false
  };

  componentDidMount() {
    this.setState({ width: new Animated.Value(this.props.initialSearchWidth) }, () => {
      Animated.timing(this.state.width, {
        toValue: Sizes.width - Sizes.iconSize.medium - Sizes.distance.smaller * 4 - scale(26),
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
    let { rightButton, searchText } = this.props;
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity
          accessibilityLabel="cart_container_drawer_toggle"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: Sizes.distance.smaller
          }}
          onPress={this.onBack}
        >
          <Icon name="arrow-left" type="material-community" size={Sizes.iconSize.medium} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Animated.View style={{ width: this.state.width }}>
            <View
              style={{
                paddingHorizontal: Sizes.distance.default,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: scale(8)
              }}
            >
              <Icon name="search" size={scale(20)} color={Colors.reddishOrange} />
              <TextInput
                style={[Fonts.body1Regular, { flex: 1, paddingLeft: scale(4), height: scale(32) }]}
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
                selectionColor={Colors.reddishOrange}
              />
              <Icon
                type="material-community"
                name="close-circle"
                size={scale(18)}
                color={Colors.cloudyBlue}
                onPress={this.clearSearchText}
              />
            </View>
          </Animated.View>
        </View>
        {this.state.focusing ? this.renderCancelText() : rightButton && rightButton}
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
        <Text style={[Fonts.body1Regular, { color: 'white', padding: Sizes.distance.smaller }]}>Hủy</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.darkGreyBlue,
    paddingTop: Sizes.header.statusBarHeight
  }
});
