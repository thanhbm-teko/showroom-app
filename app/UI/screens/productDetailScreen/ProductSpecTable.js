import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { fonts, screen, colors, scale } from '../../styles';
export default class ProductSpecTable extends Component {
  state = {
    showFirstTab: true
  };

  render() {
    return (
      <View>
        {this.renderSpecTableHeader()}
        {this.renderSpecTable()}
      </View>
    );
  }

  renderSpecTableHeader = () => {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        {this.renderHeaderTitle('Mô tả sản phẩm', true)}
        {this.renderHeaderTitle('Thông số kỹ thuật', false)}
      </View>
    );
  };

  renderHeaderTitle(titleText, isFirstTab) {
    let { showFirstTab } = this.state;
    let isFocus = (isFirstTab && showFirstTab) || (!isFirstTab && !showFirstTab);

    return (
      <TouchableOpacity
        style={[
          styles.headerButton,
          {
            borderBottomColor: isFocus ? colors.brightOrange : colors.paleLilac,
            borderBottomWidth: isFocus ? 4 : 0.5
          }
        ]}
        onPress={() => this.setState({ showFirstTab: isFirstTab })}
      >
        <Text style={[fonts.heading1, { color: isFocus ? colors.brightOrange : colors.darkGreyBlue }]}>{titleText}</Text>
      </TouchableOpacity>
    );
  }

  renderSpecTable() {
    if (this.state.showFirstTab) {
      return <Text style={[fonts.body1Regular, styles.container]}>{this.props.description}</Text>;
    } else {
      return this.renderSpecs();
    }
  }

  renderSpecs() {
    let { isLoading, specifications } = this.props;
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    if (specifications.length === 0) {
      return <Text style={[fonts.body1Regular, styles.container]}>Chưa có thông tin</Text>;
    }
    return (
      <View style={{ padding: screen.distance.smaller, backgroundColor: 'white' }}>
        <View style={{ borderRadius: screen.distance.default, overflow: 'hidden' }}>
          {specifications.map((item, index) => (
            <View style={{ flexDirection: 'row', backgroundColor: index % 2 === 0 ? colors.paleGrey : 'white' }} key={index}>
              <Text style={[fonts.body1, styles.specificationValue]}>{item.name}</Text>
              <Text style={[fonts.body1, styles.specificationKey]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: screen.distance.smaller,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headerButton: {
    flex: 1,
    paddingVertical: scale(14),
    alignItems: 'center'
  },
  specificationKey: {
    flex: 1,
    paddingVertical: screen.distance.default,
    paddingRight: screen.distance.smaller,
    fontFamily: 'sale-text-regular',
    textAlign: 'right',
    color: colors.darkGreyBlue
  },
  specificationValue: {
    flex: 1,
    paddingVertical: screen.distance.default,
    paddingLeft: screen.distance.smaller,
    fontFamily: 'sale-text-regular',
    color: colors.steel
  }
});
