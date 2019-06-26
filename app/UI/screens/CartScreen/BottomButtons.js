import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from '../../components/button/Button';
import { screen, colors, fonts, scale } from '../../styles';

export default class BottomButtons extends React.Component {
  render() {
    let readyToOrder = true;

    return (
      <View style={styles.container}>
        <Button
          title={'Combo'}
          color={colors.darkGreyBlue}
          textStyle={[fonts.heading1, { color: 'white' }]}
          onPress={this.goToComboList}
          containerStyle={styles.comboBtn}
          // canShake={true}
          // canCreateCombo={this.state.canCreateCombo}
        />
        <Button
          title={'Ưu đãi'}
          color={!readyToOrder ? colors.paleGrey : colors.frogGreen}
          textStyle={[fonts.heading1, { color: !readyToOrder ? colors.cloudyBlue : 'white' }]}
          onPress={this.onOpenVoucherSelectionModal}
          containerStyle={styles.orderPromoBtn}
          disabled={!readyToOrder}
        />
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          testID={'cart_container_continue'}
          onPress={() => this.onContinueHandleCart(false)}
          style={[styles.continueBtn, { backgroundColor: readyToOrder ? colors.brightOrange : colors.paleGrey }]}
          disabled={!readyToOrder}
        >
          <Text
            style={[
              fonts.heading1,
              { color: readyToOrder ? 'white' : colors.cloudyBlue, marginRight: screen.distance.default }
            ]}
          >
            Tiếp tục
          </Text>
          <View style={{ width: scale(24), height: scale(24) }}>
            <Icon
              name={'arrow-right'}
              type="material-community"
              size={scale(24)}
              color={readyToOrder ? 'white' : colors.cloudyBlue}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: screen.distance.default,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: colors.paleLilac,
    borderTopWidth: 0.5
  },
  comboBtn: {
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16)
  },
  orderPromoBtn: {
    borderRadius: scale(8),
    justifyContent: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    marginLeft: screen.distance.smaller
  },
  continueBtn: {
    borderRadius: scale(8),
    paddingVertical: screen.distance.default,
    paddingLeft: scale(16),
    paddingRight: screen.distance.default,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
