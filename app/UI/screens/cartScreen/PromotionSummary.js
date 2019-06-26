import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { fonts, colors, scale } from '../../styles';

import Discount from '../../components/benefit/Discount';
import Gift from '../../components/benefit/Gift';

export default class PromotionSummary extends Component {
  state = {
    expanding: false
  };

  render() {
    let { promotions } = this.props;
    let { expanding } = this.state;

    if (promotions.length > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[fonts.subheading, { color: colors.clearBlue }]} onPress={this.togglePromotion}>{`${
              promotions.length
            } CTKM đang áp dụng `}</Text>
            <Icon
              type="ionicon"
              name={expanding ? 'ios-arrow-down' : 'ios-arrow-forward'}
              size={scale(12)}
              color={colors.clearBlue}
            />
          </View>
          {expanding &&
            promotions.map((p, i) => (
              <View key={i}>
                {i > 0 ? <View style={styles.horizontalRow} /> : null}
                <View key={i} style={styles.promotionContainer}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[fonts.heading1]}>{p.name}</Text>
                  </View>
                  <Discount value={p.discount} />
                  {p.gifts.map((g, j) => (
                    <Gift key={j} gift={g.product} />
                  ))}
                </View>
              </View>
            ))}
        </View>
      );
    }

    return null;
  }

  togglePromotion = () => {
    this.setState({ expanding: !this.state.expanding });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    backgroundColor: 'white'
  },
  promotionContainer: {
    flex: 1,
    padding: scale(12)
  },
  horizontalRow: {
    marginLeft: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.cloudyBlue
  }
});
