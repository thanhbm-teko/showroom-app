import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';

import ModalHeader from '../../components/modal/ModalHeader';
import PickerPan from './PickerPan';
import { screen, colors, fonts } from '../../styles';

const StockModal = ({ onClose, visible, data, isUsingOM }) => (
  <Modal
    isVisible={visible}
    style={styles.bottomModal}
    onSwipeComplete={onClose}
    onBackdropPress={onClose}
    avoidKeyboard
    propagateSwipe
  >
    <View style={{ maxHeight: screen.height - screen.header.statusBarHeight }}>
      <PickerPan />
      <View style={{ backgroundColor: 'white' }}>
        <ModalHeader text="Thông tin tồn kho" onClose={onClose} />
        <View>
          <View style={{ backgroundColor: colors.steel, flexDirection: 'row' }}>
            <View style={styles.stockTableHeader}>
              <Text style={[fonts.caption, { color: 'white' }]}>Tên cửa hàng</Text>
            </View>
            <View style={styles.stockValueHeader}>
              <Text style={[fonts.caption, { textAlign: 'center', color: 'white' }]}>
                Tồn kho{isUsingOM ? `\n(Khả dụng/Thực tế)` : null}
              </Text>
            </View>
          </View>
          <ScrollView>
            {data.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: 'row' }}>
                  <View style={styles.labelContainer}>
                    <Text style={[fonts.body1Regular, { color: item.highlight ? colors.clearBlue : colors.darkGreyBlue }]}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.valueContainer}>
                    <Text style={[fonts.body1Regular, { color: item.highlight ? colors.clearBlue : colors.darkGreyBlue }]}>
                      {item.quantity}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  </Modal>
);

export default StockModal;

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  stockTableHeader: {
    paddingVertical: screen.distance.default,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6
  },
  stockValueHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screen.distance.default,
    flex: 4
  },
  labelContainer: {
    paddingVertical: screen.distance.default,
    paddingHorizontal: screen.distance.smaller,
    flex: 6
  },
  valueContainer: {
    paddingVertical: screen.distance.default,
    paddingHorizontal: screen.distance.smaller,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
