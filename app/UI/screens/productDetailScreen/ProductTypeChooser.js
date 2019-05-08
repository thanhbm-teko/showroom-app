import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

import { fonts, screen, colors, scale } from '../../styles';

export default class ProductTypeChooser extends Component {
  render() {
    return (
      <MenuProvider>
        <Menu>
          <MenuTrigger style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ margin: screen.distance.smaller, marginRight: screen.distance.default }}>
                <SvgUri width={scale(24)} height={scale(24)} source={require('../../../../assets/svgs/check-list.svg')} />
              </View>
              <Text style={[fonts.body1, { fontFamily: 'sale-text-regular', marginVertical: scale(14) }]}>Chọn loại hàng</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingRight: screen.distance.default }}>
              <Text
                style={[fonts.body1, { fontFamily: 'sale-text-regular', marginVertical: scale(14), marginRight: scale(4) }]}
              >
                Hàng bán
              </Text>
              <Icon name="chevron-right" type="entypo" size={scale(24)} color={colors.cloudyBlue} />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ marginLeft: screen.width / 2, borderRadius: 8 }}>
            {this.props.productTypes.map(p => this.renderOption(p))}
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  }

  renderOption(productType) {
    return (
      <MenuOption
        customStyles={{ optionWrapper: styles.menuOptionStyle }}
        onSelect={() => this.setState({ typeProduct: productType.label, typeProductCode: productType.key })}
      >
        <Text
          style={[
            fonts.body1Regular,
            { color: productType.key === this.props.selectedProductType ? colors.reddishOrange : colors.darkGreyBlue }
          ]}
        >
          {productType.label}
        </Text>
      </MenuOption>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.paleLilac,
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  }
});
