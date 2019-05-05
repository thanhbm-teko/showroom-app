import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';

import Header from '../../components/header/Header';
import CustomerTypeChooser from './CustomerTypeChooser';
import SectionTitle from './SectionTitle';
import CheckboxRow from './CheckboxRow';
import InputRow from './inputRow';
import TextInput from './inputRow/TextInput';
import Selector from './inputRow/Selector';
import Switcher from './inputRow/Switcher';

import ChangeTextModal from '../../components/modal/ChangeTextModal';

import { Colors } from '../../styles/colors';
import { scale, getLetterSpacing } from '../../styles/scale';

export default class CustomerInfoScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    textModalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Thông tin đơn hàng" />
        <CustomerTypeChooser selected={0} />
        <ScrollView style={{ flex: 1 }}>
          {this.renderBuyerSection()}
          <View style={styles.separator} />
          {this.renderBuyerSurveySection()}
          <View style={styles.separator} />
          <View style={styles.separator} />
          {this.renderShippingSection()}
          <View style={styles.separator} />
          <View style={styles.separator} />
          {this.renderPostpaidSection()}
          {this.renderOtherInfoSection()}
          <View style={styles.separator} />
          <View style={styles.separator} />
          {this.renderQuestionaireSection()}
          <View style={styles.separator} />
        </ScrollView>
        {this.renderCreateOrderButton()}
        {this.renderTextInputModal()}
      </View>
    );
  }

  renderBuyerSection() {
    return (
      <View>
        <SectionTitle title="KHÁCH HÀNG" />
        <InputRow
          title="*Số điện thoại"
          inputComponent={<TextInput value="" placeholder="Nhập số người mua..." showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow
          title="*Tên khách hàng"
          inputComponent={<TextInput value="" placeholder="Nhập tên người mua..." showKeyboard={this.showKeyboard} />}
        />
        <View style={styles.separator} />
        <InputRow title="Thành phố" inputComponent={<Selector value="Thành phố Hồ Chí Minh" />} bottomSeparator={true} />
        <InputRow title="Quận/Huyện" inputComponent={<Selector value="Quận Bình Thạnh" />} bottomSeparator={true} />
        <InputRow title="Phường/Xã" inputComponent={<Selector value="Phường 15" />} bottomSeparator={true} />
        <InputRow
          title="Địa chỉ"
          inputComponent={<TextInput value="24/69/117 Điện Biên Phủ" placeholder="Nhập ..." showKeyboard={this.showKeyboard} />}
        />
      </View>
    );
  }

  renderBuyerSurveySection() {
    return (
      <View>
        <InputRow title="*Phạm vi" inputComponent={<Selector value="Học sinh/sinh viên" />} bottomSeparator={true} />
        <InputRow title="*Độ tuổi" inputComponent={<Selector value="Từ 25 đến 30 tuổi" />} bottomSeparator={true} />
        <InputRow title="*Giới tính" inputComponent={<Selector value="Nam" />} />
      </View>
    );
  }

  renderShippingSection() {
    return (
      <View>
        <InputRow title="Giao hàng" inputComponent={<Switcher value={true} />} />
        <SectionTitle title="KHÁCH HÀNG" />
        <InputRow title="Dùng thông tin khách hàng" inputComponent={<Switcher value={false} />} />
        <View style={styles.separator} />
        <InputRow title="*Thời gian" inputComponent={<TextInput value="18/02/2019 18:08" />} bottomSeparator={true} />
        <InputRow
          title="*SĐT người nhận"
          inputComponent={<TextInput value="" placeholder="Nhập số người nhận..." showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow
          title="*Tên người nhận"
          inputComponent={<TextInput value="" placeholder="Nhập tên người nhận..." showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow title="*Thành phố" inputComponent={<Selector value="" />} bottomSeparator={true} />
        <InputRow title="*Quận/Huyện" inputComponent={<Selector value="" />} bottomSeparator={true} />
        <InputRow title="*Phường/Xã" inputComponent={<Selector value="" />} bottomSeparator={true} />
        <InputRow
          title="*Địa chỉ"
          inputComponent={<TextInput value="" placeholder="Nhập địa chỉ người nhận..." showKeyboard={this.showKeyboard} />}
        />
      </View>
    );
  }

  renderPostpaidSection() {
    return (
      <View>
        <InputRow title="Công nợ" inputComponent={<Switcher value={true} />} />
        <SectionTitle title="CÔNG NỢ" />
        <InputRow
          title="Công nợ hiện tại"
          inputComponent={<TextInput value="0đ" placeholder="" showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow
          title="Giá trị đơn"
          inputComponent={<TextInput value="1.270.000đ" placeholder="" showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow
          title="Trả trước"
          inputComponent={<TextInput value="0đ" placeholder="" showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow
          title="Công nợ sau đơn"
          inputComponent={<TextInput value="1.270.000đ" placeholder="" showKeyboard={this.showKeyboard} />}
          bottomSeparator={true}
        />
        <InputRow
          title="Hạn thanh toán"
          inputComponent={<TextInput value="1 ngày" placeholder="" showKeyboard={this.showKeyboard} />}
        />
      </View>
    );
  }

  renderOtherInfoSection() {
    return (
      <View>
        <SectionTitle title="THÔNG TIN KHÁC" />
        <InputRow title="Cài đặt" inputComponent={<Switcher value={true} />} bottomSeparator={true} />
        <InputRow
          title="Hỗ trợ kỹ thuật (đi kèm giao hàng)"
          inputComponent={<Switcher value={true} />}
          bottomSeparator={true}
        />
        <InputRow
          title="Ghi chú"
          inputComponent={<TextInput value="" placeholder="Nhập ghi chú..." showKeyboard={this.showKeyboard} />}
        />
      </View>
    );
  }

  renderQuestionaireSection() {
    return (
      <View>
        <InputRow title="Khảo sát khách hàng" inputComponent={<Switcher value={true} />} />
        <SectionTitle title="KHÁCH HÀNG BIẾT ĐẾN PHONG VŨ QUA" />
        <CheckboxRow title="Tờ rơi" value={false} bottomSeparator={true} />
        <CheckboxRow title="Facebook" value={true} bottomSeparator={true} />
        <CheckboxRow title="Google" value={false} bottomSeparator={true} />
        <CheckboxRow title="Roadshow" value={false} bottomSeparator={true} />
        <CheckboxRow title="Website phongvu.vn" value={false} bottomSeparator={true} />
        <CheckboxRow title="Bạn bè/Người thân" value={false} bottomSeparator={true} />
        <CheckboxRow title="Khác" value={false} />
      </View>
    );
  }

  renderCreateOrderButton() {
    return (
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đặt đơn</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderTextInputModal() {
    return (
      <ChangeTextModal
        visible={this.state.textModalVisible}
        title={'Nhập thông tin'}
        placeholder={'Nhập thông tin'}
        onSubmit={this.onSubmitText}
        onClose={this.onCloseChangeTextModal}
      />
    );
  }

  onSubmitText = text => {};

  showKeyboard = () => {
    this.setState({ textModalVisible: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  separator: {
    height: scale(10)
  },
  buttonArea: {
    padding: scale(12),
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.paleGrey
  },
  button: {
    backgroundColor: Colors.reddishOrange,
    height: scale(48),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'sale-text-semibold',
    fontSize: scale(15),
    letterSpacing: getLetterSpacing(-0.24),
    lineHeight: scale(20),
    textAlignVertical: 'center',
    color: 'white'
  }
});
