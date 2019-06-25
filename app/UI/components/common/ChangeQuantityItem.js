import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewPropTypes, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import { getLetterSpacing, colors, scale } from '../../styles';

/**
 * @augments {Component<{  quantity:number,  minQuantity:number,  maxQuantity:number,  onUpdateQuantity:Function,  onPressItemQuantity:Function,  handleQuantityInputRef:Function>}
 */
class ChangeQuantityItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let quantity = nextProps.quantity;
    return { quantity };
  }

  updateQuantity = quantity => {
    this.props.onUpdateQuantity(quantity);
  };

  onChangeQuantityText = text => {
    let quantity = parseInt(text) || this.props.minQuantity;
    this.props.onUpdateQuantity(quantity);
  };

  decreaseQuantity = () => {
    if (this.state.quantity > this.props.minQuantity) {
      this.updateQuantity(this.state.quantity - 1);
    }
  };

  increaseQuantity = () => {
    if (this.state.quantity < this.props.maxQuantity) {
      this.updateQuantity(this.state.quantity + 1);
    }
  };

  renderQuantity = () => {
    const { onPressItemQuantity, handleQuantityInputRef, editable } = this.props;

    if (onPressItemQuantity) {
      return (
        <TouchableOpacity onPress={onPressItemQuantity} disabled={!editable}>
          <View style={styles.quantity}>
            <Text style={editable ? styles.quantityInput : styles.disabledQuantityInput}>{this.state.quantity}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.quantity}>
          <TextInput
            ref={handleQuantityInputRef}
            keyboardType="numeric"
            onFocus={this.props.onFocus}
            value={String(this.state.quantity)}
            underlineColorAndroid={'transparent'}
            style={editable ? styles.quantityInput : styles.disabledQuantityInput}
            onChangeText={this.onChangeQuantityText}
            editable={editable}
            onEndEditing={() => {
              this.updateQuantity(this.state.quantity);
            }}
          />
        </View>
      );
    }
  };

  render() {
    const { quantity } = this.state;
    const { minQuantity, maxQuantity } = this.props;

    let canIncrease = quantity < maxQuantity;
    let canDecrease = quantity > minQuantity;

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity activeOpacity={canDecrease ? 1 : 0.2} onPress={this.decreaseQuantity} disabled={!canDecrease}>
          <View style={styles.changeQuantityButton}>
            <View style={{ width: scale(16), height: scale(16) }}>
              <Icon name="minus" size={scale(16)} color={colors.steel} type="material-community" />
            </View>
          </View>
        </TouchableOpacity>
        {this.renderQuantity()}
        <TouchableOpacity activeOpacity={canIncrease ? 1 : 0.2} onPress={this.increaseQuantity} disabled={!canIncrease}>
          <View style={styles.changeQuantityButton}>
            <View style={{ width: scale(16), height: scale(16) }}>
              <Icon name="plus" size={16} color={colors.steel} type="material-community" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ChangeQuantityItem.propTypes = {
  editable: PropTypes.bool, // edit by enter number
  quantity: PropTypes.number,
  minQuantity: PropTypes.number,
  maxQuantity: PropTypes.number,
  onUpdateQuantity: PropTypes.func,
  onPressItemQuantity: PropTypes.func,
  handleQuantityInputRef: PropTypes.func,
  style: ViewPropTypes.style
};

ChangeQuantityItem.defaultProps = {
  editable: true,
  quantity: 1,
  minQuantity: 1,
  maxQuantity: Number.MAX_SAFE_INTEGER
};

export default ChangeQuantityItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(32),
    width: scale(96),
    borderWidth: 0.5,
    borderRadius: scale(8),
    borderColor: colors.lightGray,
    backgroundColor: 'white'
  },
  quantity: {
    width: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paleGrey,
    borderColor: colors.lightBlueGrey,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    flexDirection: 'row',
    paddingVertical: scale(3.5)
  },
  quantityInput: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.2),
    lineHeight: scale(20),
    color: colors.darkGreyBlue,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: Platform.OS === 'ios' ? scale(3) : 0 //make text align vertical in ios (textAlignVertical is Android  only)
  },
  disabledQuantityInput: {
    fontFamily: 'sale-text-regular',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.2),
    lineHeight: scale(20),
    color: colors.darkGreyBlue,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: Platform.OS === 'ios' ? scale(3) : 0
  },
  changeQuantityButton: {
    flex: 1,
    padding: scale(6),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
