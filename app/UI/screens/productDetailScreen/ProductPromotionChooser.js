import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';

import BenefitItem from './benefit/BenefitItem';
import ChoosePromotionsModal from './ChoosePromotionsModal';
import ColoredTextLabel from '../../components/label/ColoredTextLabel';
import { fonts, screen, colors, scale } from '../../styles';

import { getPromotionsPreview } from '../../../core/useCase/choosePromotionForProduct/choosePromotion.ts';

class ProductPromotionChooser extends Component {
  state = {
    promotionsPreview: [],
    showChooserPopup: false,
    collapsed: true
  };

  async componentDidMount() {
    let { promotions } = this.props;
    let promotionsPreview = await getPromotionsPreview(promotions);

    this.setState({
      promotionsPreview
    });
  }

  onToggleShowPromotions = () => {
    this.setState({ showChooserPopup: !this.state.showChooserPopup });
  };

  onClose = () => this.setState({ showChooserPopup: false });

  renderSelector = () => {
    return (
      <TouchableOpacity onPress={() => {}} style={{ padding: screen.distance.smaller, paddingRight: 0 }}>
        <Icon type="material" name={'radio-button-unchecked'} size={scale(24)} />
      </TouchableOpacity>
    );
  };

  renderPrice = discount => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[fonts.heading1, { color: colors.brightOrange }]}>80000</Text>
        {discount > 0 ? (
          <Text style={[fonts.subheading, { textDecorationLine: 'line-through', marginLeft: screen.distance.default }]}>
            100000
          </Text>
        ) : null}
      </View>
    );
  };

  renderPromotionHeader = (promotion, discount) => {
    let { name, promotionQuantity } = promotion;
    if (name === 'Không sử dụng khuyến mãi') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderSelector()}
          <TouchableOpacity style={{ padding: scale(14), flex: 1 }} onPress={() => {}}>
            <Text style={fonts.body1}>{name}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderSelector()}
          <TouchableOpacity style={styles.promotionInfoContainer} onPress={() => {}}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[fonts.heading1]}>{name}</Text>
              </View>
              {this.renderPrice(discount)}
            </View>
            {promotionQuantity.remainQuantity ? (
              <ColoredTextLabel textStyle={fonts.footnote} type="quantity" text={promotionQuantity.remainQuantity} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    }
  };

  renderPromotionDetail = promotion => {
    return (
      <View style={styles.promotionContainer}>
        {this.renderPromotionHeader(promotion, 0)}
        <Collapsible collapsed={false}>
          <BenefitItem benefit={promotion.benefit} />
        </Collapsible>
      </View>
    );
  };

  render() {
    let { promotionsPreview } = this.state;

    return (
      <View style={styles.promotionsContainer}>
        <TouchableOpacity onPress={this.onToggleShowPromotions} style={styles.promotionTitle}>
          <Text style={[fonts.body1, { color: 'white', flex: 1, textAlignVertical: 'center' }]}>Chọn khuyến mãi</Text>
          <Icon name="chevron-right" type="material-community" size={scale(24)} color={'white'} />
        </TouchableOpacity>
        <View style={styles.chosenPromotions}>
          {promotionsPreview
            .filter(p => p.selected)
            .map(promotion => (
              <View key={promotion.key}>{this.renderPromotionDetail(promotion)}</View>
            ))}
        </View>
        <ChoosePromotionsModal visible={this.state.showChooserPopup} onClose={this.onClose}>
          <View>
            {promotionsPreview.map(promotion => (
              <View key={promotion.key}>{this.renderPromotionDetail(promotion)}</View>
            ))}
          </View>
        </ChoosePromotionsModal>
      </View>
    );
  }
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
)(ProductPromotionChooser);

const styles = StyleSheet.create({
  promotionsContainer: {
    flex: 1,
    backgroundColor: colors.orangeyRed,
    padding: scale(12)
  },
  chosenPromotions: {
    backgroundColor: 'white',
    borderRadius: scale(8),
    overflow: 'hidden',
    marginVertical: screen.distance.smaller
  },
  promotionContainer: {
    borderBottomWidth: 0.5,
    borderColor: colors.paleLilac
  },
  promotionInfoContainer: {
    paddingHorizontal: screen.distance.smaller,
    paddingVertical: screen.distance.default,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  originalPrice: {
    color: 'gray',
    fontSize: screen.fontSize.default,
    fontWeight: 'bold',
    textDecorationLine: 'line-through'
  },
  promotionTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
