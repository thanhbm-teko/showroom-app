import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Gift from './Gift';
import Discount from './Discount';

import { screen, colors, scale } from '../../styles';

export default class BenefitItem extends Component {
  render() {
    let { benefit } = this.props;

    if (!benefit.children) {
      return (
        <View style={[styles.benefitContainer, benefit.parent ? {} : { backgroundColor: colors.paleGrey }]}>
          {this.renderSingleBenefit()}
          {this.renderSelector()}
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
        return <Discount value={benefit.value} />;
      case 'gift':
        return <Gift gift={benefit.product} promotionQuantity={benefit.promotionQuantity} />;
      default:
        return null;
    }
  }

  renderSelector() {
    let { benefit, onChooseBenefit } = this.props;
    return (
      <TouchableOpacity onPress={() => onChooseBenefit(benefit)} style={styles.benefitQuantity}>
        <Icon
          type="material"
          name={benefit.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={scale(20)}
          color={benefit.selected ? colors.reddishOrange : colors.cloudyBlue}
        />
      </TouchableOpacity>
    );
  }

  renderCombineBenefit() {
    let { benefit, onChooseBenefit } = this.props;
    let listStyle = this.getBenefitListStyle(benefit);

    return (
      <View style={listStyle}>
        {benefit.children.map((b, i) => (
          <BenefitItem key={i} benefit={b} onChooseBenefit={onChooseBenefit} />
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
      hasSibling ? (benefit.selected ? styles.activeBenefitListWithSibling : styles.inactiveBenefitListWithSibling) : {},
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
    backgroundColor: 'transparent',
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
  activeBenefitListWithSibling: {
    backgroundColor: 'white',
    marginVertical: screen.margin.tiny,
    borderColor: colors.orangeRed,
    borderWidth: scale(1),
    borderRadius: scale(8)
  },
  inactiveBenefitListWithSibling: {
    backgroundColor: colors.paleGrey,
    marginVertical: screen.margin.tiny,
    borderRadius: scale(8)
  },
  quantity: {
    fontSize: screen.fontSize.smaller
  }
});
