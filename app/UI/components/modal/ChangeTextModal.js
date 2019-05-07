import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';

import ModalHeader from '../modal/ModalHeader';
import KeyboardModal from '../modal/KeyboardModal';
import { colors, scale, getLetterSpacing } from '../../styles';

/**
 * @augments {Component<{  title:string,  placeholder:string,  value:number,  unitText:string,  visible:boolean,  onSubmit:Function,  onClose:Function.isRequired>}
 */
class ChangeTextModal extends Component {
  state = {
    value: '',
    height: 20
  };

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) {
      this.setState({ value: '' });
      setTimeout(() => {
        this.valueInputRef && this.valueInputRef.focus();
      }, 100);
    }
  }

  onHandleInputRef = ref => {
    this.valueInputRef = ref;
  };

  onCancel = () => {
    this.props.onClose();
  };

  onSubmit = () => {
    this.props.onClose();
    this.props.onSubmit(this.state.value);
  };

  onChangeValueText = value => {
    this.setState({ value });
  };

  updateSize = height => {
    this.setState({
      height
    });
  };

  render() {
    const { visible, placeholder, inputStyle, keyboardType, additionalProps } = this.props;
    const { height } = this.state;

    return (
      <KeyboardModal visible={visible} onClose={this.props.onClose}>
        <View>
          <ModalHeader
            title={this.props.title}
            leftButton={{ text: 'Hủy', onPress: this.onCancel }}
            rightButton={{ text: 'Xác nhận', onPress: this.onSubmit }}
          />
          <View style={styles.content}>
            <TextInput
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor={colors.darkGray}
              ref={this.onHandleInputRef}
              value={this.state.value}
              selectionColor={colors.primary}
              underlineColorAndroid={'transparent'}
              style={[styles.input, { height }, inputStyle]}
              onChangeText={this.onChangeValueText}
              onSubmitEditing={this.onSubmit}
              multiline={true}
              onContentSizeChange={e => this.updateSize(e.nativeEvent.contentSize.height)}
              {...additionalProps}
            />
          </View>
        </View>
      </KeyboardModal>
    );
  }
}

export default ChangeTextModal;

ChangeTextModal.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired
};

ChangeTextModal.defaultProps = {
  title: 'Giảm giá',
  placeholder: 'Nhập số tiền',
  visible: false,
  value: 0
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    minHeight: scale(52),
    paddingVertical: scale(16)
  },
  input: {
    color: colors.black,
    fontSize: scale(14),
    fontFamily: 'sale-text-regular',
    lineHeight: scale(19),
    paddingHorizontal: scale(16),
    letterSpacing: getLetterSpacing(-0.15)
  }
});
