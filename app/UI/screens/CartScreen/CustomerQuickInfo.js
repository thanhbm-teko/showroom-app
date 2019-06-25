import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { screen, colors, fonts, scale } from '../../styles';

export class CustomerQuickInfo extends React.Component {
  state = {
    buyerTelephone: '',
    buyerName: '',
    isCustomerFound: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputSearchPhone}>
          <Icon name="cellphone" type="material-community" size={scale(20)} color={colors.darkGray} />
          <TextInput
            style={[fonts.body1Regular, styles.phoneText]}
            keyboardType="numeric"
            onChangeText={text => {
              this.setState({
                buyerTelephone: text
              });
            }}
            onEndEditing={this.findCustomer}
            value={this.state.buyerTelephone}
            placeholderTextColor={colors.steel}
            placeholder="Số điện thoại"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          {this.state.isCustomerFound ? (
            <Icon
              type="material-community"
              name="format-list-bulleted"
              color={colors.brightOrange}
              size={scale(20)}
              onPress={this.showCustomerOrderHistory}
            />
          ) : null}
        </View>
        <View style={[styles.inputSearchPhone, styles.nameText]}>
          <Icon name="account" type="material-community" size={scale(20)} color={colors.darkGray} />
          <TextInput
            style={[fonts.body1Regular, styles.inputNameContainer]}
            placeholderTextColor={colors.steel}
            onChangeText={text => {
              this.setState({
                buyerName: text
              });
            }}
            value={this.state.buyerName}
            placeholder="Tên KH"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
        </View>
      </View>
    );
  }

  showCustomerOrderHistory = () => {};

  findCustomer = () => {};
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
)(CustomerQuickInfo);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: colors.paleLilac
  },
  inputSearchPhone: {
    flex: 1,
    paddingLeft: screen.distance.smaller,
    paddingRight: screen.distance.default,
    flexDirection: 'row',
    height: scale(44),
    borderBottomWidth: 0.5,
    borderColor: colors.paleLilac,
    alignItems: 'center'
  },
  inputNameContainer: {
    flex: 1,
    color: colors.darkGreyBlue,
    paddingLeft: screen.distance.default,
    textAlignVertical: 'center'
  },
  phoneText: {
    flex: 1,
    paddingLeft: screen.distance.default,
    textAlignVertical: 'center'
  },
  nameText: {
    borderLeftWidth: 0.5,
    borderColor: colors.paleLilac
  }
});
