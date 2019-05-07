import React, { Component } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import { fonts, screen, colors, scale } from '../../styles';
export class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  onBackPressed = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  renderTopPanel() {
    return (
      <View style={{ alignItems: 'center' }}>
        <ImageWrapper
          resizeMode={'center'}
          source={null}
          style={{
            width: screen.width,
            height: scale(190),
            backgroundColor: colors.paleGrey
          }}
        />
        {this.props.onClose ? (
          <TouchableOpacity
            style={{ position: 'absolute', top: screen.distance.smaller, right: screen.distance.smaller }}
            onPress={this.props.onClose}
          >
            <Icon type="material-community" name="close" size={scale(24)} color={colors.brightOrange} />
          </TouchableOpacity>
        ) : null}
        {/*  add emptyview and then you can add report button :D */}
        <View
          style={{
            height: scale(14),
            width: screen.width,
            backgroundColor: 'white',
            borderTopColor: colors.paleLilac,
            borderTopWidth: 0.5
          }}
        />
        {this.renderReportButton()}
      </View>
    );
  }

  renderReportButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ reportModalVisible: true })}
        style={{
          position: 'absolute',
          top: scale(176),
          right: scale(12),
          height: scale(28),
          paddingHorizontal: scale(4),
          alignItems: 'center',
          borderRadius: scale(14),
          borderColor: colors.paleLilac,
          borderWidth: 1,
          backgroundColor: 'white',
          flexDirection: 'row'
        }}
      >
        <Icon name="error" size={scale(20)} color={colors.cloudyBlue} />
        <Text style={[textStyles.subheading, { color: colors.steel, marginLeft: scale(4) }]}>Báo lỗi sản phẩm</Text>
      </TouchableOpacity>
    );
  };

  renderProductGeneralInfo() {
    return (
      <View
        style={{
          padding: screen.distance.smaller,
          paddingTop: 0,
          borderBottomColor: colors.paleLilac,
          borderBottomWidth: 0.5,
          backgroundColor: 'white'
        }}
      >
        <Text style={[textStyles.subheading, { color: colors.clearBlue }]}># {product.sku}</Text>
        <Text style={textStyles.display}>{(this.props.item && this.props.item.name) || (product && product.name)}</Text>
        <View style={{ flexDirection: 'row', marginTop: screen.distance.default }}>
          <ColoredTextLabel
            text={product.status_detail ? product.status_detail : 'Không xác định'}
            type={product.status_detail ? 'info' : 'normal'}
            textStyle={{ fontFamily: 'sale-text-regular' }}
          />
          <ColoredTextLabel
            text={`BH ${product.warranty || 0} tháng`}
            type="orange"
            style={{ marginLeft: scale(4) }}
            textStyle={{ fontFamily: 'sale-text-regular' }}
          />
        </View>
      </View>
    );
  }

  renderProductTypeChooser() {
    return (
      <Menu>
        <MenuTrigger
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: colors.paleLilac,
            borderBottomWidth: 0.5,
            backgroundColor: 'white'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ margin: screen.distance.smaller, marginRight: screen.distance.default }}>
              <SvgUri width={scale(24)} height={scale(24)} source={require('../resources/check-list.svg')} />
            </View>
            <Text style={[textStyles.body1, { fontFamily: 'sale-text-regular', marginVertical: scale(14) }]}>
              Chọn loại hàng
            </Text>
          </View>
          <View style={{ flexDirection: 'row', paddingRight: screen.distance.default }}>
            <Text
              style={[textStyles.body1, { fontFamily: 'sale-text-regular', marginVertical: scale(14), marginRight: scale(4) }]}
            >
              {this.state.typeProduct}
            </Text>
            <Icon name="chevron-right" type="entypo" size={scale(24)} color={colors.cloudyBlue} />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ marginLeft: screen.width / 2, borderRadius: 8 }}>
          <MenuOption
            customStyles={{ optionWrapper: styles.menuOptionStyle }}
            onSelect={() => this.setState({ typeProduct: type_products[0].label, typeProductCode: type_products[0].key })}
          >
            <Text
              style={[
                textStyles.body1Regular,

                { color: type_products[0].key === typeProductCode ? colors.reddishOrange : colors.darkGreyBlue }
              ]}
            >
              {type_products[0].label}
            </Text>
          </MenuOption>
          <MenuOption
            customStyles={{ optionWrapper: styles.menuOptionStyle }}
            onSelect={() => this.setState({ typeProduct: type_products[1].label, typeProductCode: type_products[1].key })}
          >
            <Text
              style={[
                textStyles.body1Regular,
                { color: type_products[1].key === typeProductCode ? colors.reddishOrange : colors.darkGreyBlue }
              ]}
            >
              {type_products[1].label}
            </Text>
          </MenuOption>
          <MenuOption
            customStyles={{ optionWrapper: styles.menuOptionStyle }}
            onSelect={() => this.setState({ typeProduct: type_products[2].label, typeProductCode: type_products[2].key })}
          >
            <Text
              style={[
                textStyles.body1Regular,
                { color: type_products[2].key === typeProductCode ? colors.reddishOrange : colors.darkGreyBlue }
              ]}
            >
              {type_products[2].label}
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }

  renderPriceSection() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: screen.distance.smaller,
          paddingVertical: scale(6),
          borderBottomWidth: 0.5,
          borderBottomColor: colors.paleLilac,
          backgroundColor: 'white'
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={[textStyles.medium, { color: colors.brightOrange, paddingVertical: screen.distance.smaller }]}>
            {product && utils.formatPrice(product.price_w_vat)}
          </Text>
          {product && product.original_price > product.price_w_vat ? (
            <Text
              style={[textStyles.body1, { color: colors.darkGray, textDecorationLine: 'line-through', marginLeft: scale(4) }]}
            >
              {product && utils.formatPrice(product.original_price)}
            </Text>
          ) : null}
        </View>
        {this.renderCartButton(product)}
      </View>
    );
  }

  renderStock() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: scale(48),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: screen.distance.smaller,
          marginTop: scale(10),
          backgroundColor: 'white',
          borderColor: colors.paleLilac,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5
        }}
        onPress={this.toggleStockDetail}
      >
        <Image source={require('../resources/images/shop.png')} style={{ width: scale(24), height: scale(24) }} />
        <Text style={[textStyles.body1, { marginLeft: scale(8), flex: 1 }]}>
          Tồn kho{isUsingOM ? <Text style={textStyles.body1Regular}> (Khả dụng/Thực tế)</Text> : null}
        </Text>
        {this.props.isUsingOM ? (
          <Text style={[textStyles.body1Regular, { color: colors.steel, marginRight: screen.distance.default }]}>
            <Text style={[textStyles.body1, { color: colors.reddishOrange }]}>
              {this.getStockQty('available').currentStoreStock}
            </Text>
            /{this.getStockQty('on_hand').currentStoreStock}
          </Text>
        ) : (
          <Text style={[textStyles.body1, { color: colors.reddishOrange, marginRight: screen.distance.default }]}>
            {this.getStockQty().currentStoreStock}
          </Text>
        )}
        <Icon name="chevron-right" type="material-community" size={scale(24)} color={colors.cloudyBlue} />
      </TouchableOpacity>
    );
  }

  renderNotes(product) {
    let now = utils.getNow();

    if (product.promotions && product.promotions.notes && product.promotions.notes.length > 0) {
      return (
        <View style={{ marginTop: screen.margin }}>
          <Text style={{ fontWeight: 'bold', fontSize: screen.common.mediumFontSize }}>Ghi chú: </Text>
          {product.promotions.notes
            .filter(n => now.timeStr > n.begun_at && now.timeStr < n.ended_at)
            .map((n, i) => (
              <Text style={{ fontSize: screen.smallFontSize }} key={i}>
                {`• ${n.name}\n`}
                <Text style={{ fontFamily: 'sale-text-light-italic', color: '#e60000' }}>
                  Từ {utils.simplifyTimeStr(n.begun_at)} đến {utils.simplifyTimeStr(n.ended_at)}
                </Text>
              </Text>
            ))}
        </View>
      );
    } else {
      return null;
    }
  }

  renderSpecTableHeader = () => {
    let { showFirstTab } = this.state;
    return (
      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: scale(14),
            borderBottomColor: showFirstTab ? colors.brightOrange : colors.paleLilac,
            borderBottomWidth: showFirstTab ? 4 : 0.5,
            alignItems: 'center'
          }}
          onPress={() => this.setState({ showFirstTab: true })}
        >
          <Text style={[textStyles.heading1, { color: showFirstTab ? colors.brightOrange : colors.darkGreyBlue }]}>
            Mô tả sản phẩm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: scale(14),
            borderBottomColor: showFirstTab ? colors.paleLilac : colors.brightOrange,
            borderBottomWidth: showFirstTab ? 0.5 : 4,
            alignItems: 'center'
          }}
          onPress={() => this.setState({ showFirstTab: false })}
        >
          <Text style={[textStyles.heading1, { color: showFirstTab ? colors.darkGreyBlue : colors.brightOrange }]}>
            Thông số kỹ thuật
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSpecTable = () => {
    let { detailProduct } = this.state;
    let { firebaseConfig } = this.props;
    let spec = this.props.specification.find(item => item.sku === this.props.sku);
    let description = 'Chưa có thông tin';
    if (spec && spec.description && spec.description.length > 0 && firebaseConfig.useWebDescription) {
      description = spec.description;
    }
    if (detailProduct.description && detailProduct.description.length > 0 && !firebaseConfig.useWebDescription) {
      description = detailProduct.description;
    }
    if (this.state.showFirstTab) {
      return (
        <Text style={[textStyles.body1Regular, { padding: screen.distance.smaller, backgroundColor: 'white' }]}>
          {description}
        </Text>
      );
    } else {
      return this.renderSpecs(this.props.isLoading, spec ? this.transformAttributes(spec.attributes) : []);
    }
  };

  renderSpecs = (isLoading, data) => {
    if (isLoading) {
      return (
        <View
          style={{ padding: screen.distance.smaller, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    if (data.length === 0) {
      return (
        <Text style={[textStyles.body1Regular, { backgroundColor: 'white', padding: screen.distance.smaller }]}>
          Chưa có thông tin
        </Text>
      );
    }
    return (
      <View style={{ padding: screen.distance.smaller, backgroundColor: 'white' }}>
        <View style={{ borderRadius: screen.distance.default, overflow: 'hidden' }}>
          {data.map((item, index) => (
            <View style={{ flexDirection: 'row', backgroundColor: index % 2 === 0 ? colors.paleGrey : 'white' }} key={index}>
              <Text style={[textStyles.body1, styles.specification_value]}>{item.label}</Text>
              <Text style={[textStyles.body1, styles.specification_key]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  renderRecent() {
    if (!this.props.recentList || this.props.recentList.length === 0) {
      return null;
    }
    return (
      <View
        style={{ marginBottom: scale(100), padding: screen.distance.smaller, marginTop: scale(10), backgroundColor: 'white' }}
      >
        <Text style={textStyles.heading1}>Các sản phẩm xem gần đây</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={this.props.recentList}
          keyExtractor={item => item.sku}
          renderItem={({ item, index }) => {
            let spec = this.props.specification.find(it => it.sku === item.sku);
            return (
              <TouchableOpacity
                style={{ width: scale(106), marginRight: scale(12), marginTop: scale(12), justifyContent: 'space-between' }}
                onPress={() => this.props.navigation.navigate('ProductDetail', { sku: item.sku, from: 'Detail' })}
              >
                <View style={{ alignItems: 'center', marginBottom: screen.distance.default }}>
                  <ImageWrapper
                    source={spec && spec.source_url ? spec.source_url.base_image : null}
                    style={{ width: scale(106), height: scale(106) }}
                  />
                </View>
                <Text style={textStyles.body1Regular} numberOfLines={3}>
                  {item.name}
                </Text>
                <Text style={[textStyles.caption, { color: colors.brightOrange }]}>{utils.formatPrice(item.price_w_vat)}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderTopPanel()}
          {this.renderProductGeneralInfo()}
          <View>
            {this.renderProductTypeChooser()}
            {this.renderPriceSection()}
            {this.renderStock()}
            <StockModal
              visible={this.state.stockModalVisible}
              isLoading={false}
              isUsingOM={this.props.isUsingOM}
              onClose={this.toggleStockDetail}
              data={this.props.isUsingOM ? this.getStockWms(product.wms_stock) : this.transformStock(product.store_in_stock)}
            />
          </View>
          {/* Các chương trình khuyến mãi của sản phẩm */}
          {/* <View style={{ paddingTop: scale(10) }}>
            <ProductPromotion
              editPrice={this.state.editPriceService === null ? 0 : this.state.editPriceService}
              editPriceService={this.editPriceService}
              product={product}
              ignoreCheckVoucher={this.props.ignoreCheckVoucher}
              hidePromotion={this.props.hidePromotion}
              hostScreen="detail"
              onChooseProductSale={this.onChooseProductSale}
              cartItem={this.props.cartItem}
              defaultPromotion={this.props.defaultPromotion}
            />
          </View> */}
          {this.renderNotes(product)}
          {this.renderSpecTableHeader()}
          {this.renderSpecTable()}
          {this.renderRecent()}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: screen.header.statusBarHeight,
    backgroundColor: colors.paleGrey
  }
});
