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
    let { showFirstTab } = this.state;

    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <TouchableOpacity
          style={[
            styles.headerButton,
            {
              borderBottomColor: showFirstTab ? colors.brightOrange : colors.paleLilac,
              borderBottomWidth: showFirstTab ? 4 : 0.5
            }
          ]}
          onPress={() => this.setState({ showFirstTab: true })}
        >
          <Text style={[fonts.heading1, { color: showFirstTab ? colors.brightOrange : colors.darkGreyBlue }]}>
            Mô tả sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.headerButton,
            {
              borderBottomColor: showFirstTab ? colors.paleLilac : colors.brightOrange,
              borderBottomWidth: showFirstTab ? 0.5 : 4
            }
          ]}
          onPress={() => this.setState({ showFirstTab: false })}
        >
          <Text style={[fonts.heading1, { color: showFirstTab ? colors.darkGreyBlue : colors.brightOrange }]}>
            Thông số kỹ thuật
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
              <Text style={[fonts.body1, styles.specification_value]}>{item.name}</Text>
              <Text style={[fonts.body1, styles.specification_key]}>{item.value}</Text>
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
  specification_key: {
    flex: 1,
    paddingVertical: screen.distance.default,
    paddingRight: screen.distance.smaller,
    fontFamily: 'sale-text-regular',
    textAlign: 'right',
    color: colors.darkGreyBlue
  },
  specification_value: {
    flex: 1,
    paddingVertical: screen.distance.default,
    paddingLeft: screen.distance.smaller,
    fontFamily: 'sale-text-regular',
    color: colors.steel
  }
});
