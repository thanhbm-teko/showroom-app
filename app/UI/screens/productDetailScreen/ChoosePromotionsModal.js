import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import ModalHeader from '../../components/modal/ModalHeader';
import PickerPan from './PickerPan';

import { screen, scale } from '../../styles';

const ChoosePromotionsModal = ({ children, visible, onClose }) => {
  return (
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
          <ModalHeader text="Chọn khuyến mãi" onClose={onClose} />
          <ScrollView>
            {children}
            <View style={{ height: scale(54) }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ChoosePromotionsModal;

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
});
