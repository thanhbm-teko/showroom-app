import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { Colors } from '../../styles/colors';

class KeyboardModal extends PureComponent {
  onRequestClose = () => {
    this.props.onClose && this.props.onClose();
  };

  render() {
    const { visible, overlayColor, children, ...rest } = this.props;

    return (
      <View style={visible ? styles.overlayColorVisible : null}>
        <Modal
          {...rest}
          visible={visible}
          animationType="slide"
          transparent={true}
          onShow={this.onModalShow}
          onRequestClose={this.onRequestClose}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <TouchableWithoutFeedback onPress={this.props.onClose}>
              <View style={{ flex: 1 }} />
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View>{children}</View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default KeyboardModal;

KeyboardModal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  overlayColorVisible: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black60
  }
});
