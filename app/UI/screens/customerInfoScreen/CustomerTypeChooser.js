import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Colors } from '../../styles/colors';
import { scale, getLetterSpacing } from '../../styles/scale';

export const CUSTOMER_TYPE = {
  INDIVIDUAL: 0,
  COMPANY: 1
};

export default class CustomerTypeChooser extends React.Component {
  onClickIndividual = () => {
    this.props.onChangeCustomerType(CUSTOMER_TYPE.INDIVIDUAL);
  };

  onClickCompany = () => {
    this.props.onChangeCustomerType(CUSTOMER_TYPE.COMPANY);
  };

  render() {
    let { selected } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.block, selected === CUSTOMER_TYPE.INDIVIDUAL ? styles.hightlightBlock : {}]}
          onPress={this.onClickIndividual}
        >
          <Text style={[styles.text, selected === CUSTOMER_TYPE.INDIVIDUAL ? styles.hightlightText : {}]}>KH cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.block, selected === CUSTOMER_TYPE.COMPANY ? styles.hightlightBlock : {}]}
          onPress={this.onClickCompany}
        >
          <Text style={[styles.text, selected === CUSTOMER_TYPE.COMPANY ? styles.hightlightText : {}]}>KH doanh nghiệp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(14)
  },
  text: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: Colors.darkGreyBlue
  },
  hightlightBlock: {
    borderBottomWidth: scale(2),
    borderBottomColor: Colors.reddishOrange
  },
  hightlightText: {
    color: Colors.reddishOrange
  }
});
