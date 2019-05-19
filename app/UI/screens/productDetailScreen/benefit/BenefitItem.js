import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Gift from './Gift';
import Discount from './Discount';

import { fonts, screen, colors, scale } from '../../../styles';

export default class BenefitItem extends Component {
  render() {
    let { benefit } = this.props;

    if (!benefit.children) {
      return (
        <View style={styles.benefitContainer}>
          {this.renderSingleBenefit()}
          {this.renderQuantity()}
        </View>
      );
    } else {
      return this.renderCombineBenefit();
    }
  }

  renderSingleBenefit() {
    let { benefit } = this.props;
    switch (benefit.type) {
      case 'discount':
        return <Discount benefit={benefit} />;
      case 'gift':
        return <Gift benefit={benefit} />;
      default:
        return null;
    }
  }

  renderQuantity() {
    let quantity = 1;
    return (
      <TouchableOpacity onPress={this.onPressQuantity} style={styles.benefitQuantity}>
        <Icon
          type="material"
          name={quantity > 0 ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={scale(20)}
          color={quantity > 0 ? colors.reddishOrange : colors.cloudyBlue}
        />
      </TouchableOpacity>
    );
  }

  renderCombineBenefit() {
    let { benefit } = this.props;
    let listStyle = this.getBenefitListStyle(benefit);

    return (
      <View style={listStyle}>
        {benefit.children.map((b, i) => (
          <BenefitItem key={i} benefit={b} />
        ))}
      </View>
    );
  }

  getBenefitListStyle(benefit) {
    let hasSibling = benefit.parent && benefit.parent.children ? true : false;
    let hasGrandChild = false;
    for (let b of benefit.children) {
      hasGrandChild = hasGrandChild || (b.children ? true : false);
    }

    return [
      styles.benefitList,
      hasSibling ? styles.benefitListWithSibling : {},
      hasGrandChild ? { backgroundColor: 'white' } : {}
    ];
  }
}

BenefitItem.defaultProps = {
  benefit: null
};

const styles = StyleSheet.create({
  benefitContainer: {
    flexDirection: 'row',
    backgroundColor: colors.paleGrey,
    paddingHorizontal: screen.margin.default,
    paddingVertical: screen.margin.tiny
  },
  benefitQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: screen.distance.smaller
  },
  benefitList: {
    backgroundColor: colors.paleGrey,
    paddingHorizontal: screen.margin.default,
    flexDirection: 'column',
    alignItems: 'center'
  },
  benefitListWithSibling: {
    backgroundColor: colors.paleGrey,
    marginVertical: screen.margin.tiny,
    borderColor: colors.orangeRed,
    borderWidth: scale(1),
    borderRadius: scale(8)
  },
  quantity: {
    fontSize: screen.fontSize.smaller
  }
});
