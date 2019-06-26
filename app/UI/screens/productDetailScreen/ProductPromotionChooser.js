import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';

import ChoosePromotionsModal from './ChoosePromotionsModal';
import BenefitItem from '../../components/benefit/BenefitItem';
import ColoredTextLabel from '../../components/label/ColoredTextLabel';
import { fonts, screen, colors, scale } from '../../styles';

import * as promotionsPreviewActions from '../../reduxConnector/promotionsPreview/actions';

class ProductPromotionChooser extends Component {
  state = {
    showChooserPopup: false,
    collapsed: true
  };

  componentDidMount() {
    this.props.initPromotionsPreview(this.props.promotions);
  }

  onToggleShowPromotions = () => {
    this.setState({ showChooserPopup: !this.state.showChooserPopup });
  };

  onClose = () => this.setState({ showChooserPopup: false });

  onChoosePromotionProgram = promotion => {
    this.props.choosePromotionProgram(promotion, this.askUserWhenMeetPromotionConflict);
  };

  onChooseBenefit = benefit => {
    this.props.chooseBenefit(benefit, this.askUserWhenMeetPromotionConflict);
  };

  askUserWhenMeetPromotionConflict = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Thông báo',
        'Chương trình này không áp dụng đồng thời với các chương trình khác.\n Bạn vẫn muốn chọn?',
        [{ text: 'Không', onPress: () => resolve(false), style: 'cancel' }, { text: 'Có', onPress: () => resolve(true) }],
        { cancelable: false }
      );
    });
  };

  renderSelector = promotion => {
    return (
      <TouchableOpacity
        onPress={() => this.onChoosePromotionProgram(promotion)}
        style={{ padding: screen.distance.smaller, paddingRight: 0 }}
      >
        <Icon
          type="material"
          name={promotion.selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={scale(24)}
          color={promotion.selected ? colors.reddishOrange : colors.cloudyBlue}
        />
      </TouchableOpacity>
    );
  };

  renderPromotionHeader = (promotion, discount) => {
    let { name, promotionQuantity } = promotion;
    if (name === 'Không sử dụng khuyến mãi') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderSelector(promotion)}
          <TouchableOpacity style={{ padding: scale(14), flex: 1 }} onPress={() => {}}>
            <Text style={fonts.body1}>{name}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {this.renderSelector(promotion)}
          <TouchableOpacity style={styles.promotionInfoContainer} onPress={() => {}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[fonts.heading1]}>{name}</Text>
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
          <BenefitItem benefit={promotion.benefit} onChooseBenefit={this.onChooseBenefit} />
        </Collapsible>
      </View>
    );
  };

  render() {
    let { promotionsPreview } = this.props;

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
  return {
    promotionsPreview: state.promotionsPreview
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initPromotionsPreview: promotions => dispatch(promotionsPreviewActions.initPromotionsPreview(promotions)),
    choosePromotionProgram: (promotion, askUserWhenMeetPromotionConflict) =>
      dispatch(promotionsPreviewActions.choosePromotionProgram(promotion, askUserWhenMeetPromotionConflict)),
    chooseBenefit: (benefit, askUserWhenMeetPromotionConflict) =>
      dispatch(promotionsPreviewActions.chooseBenefit(benefit, askUserWhenMeetPromotionConflict))
  };
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
