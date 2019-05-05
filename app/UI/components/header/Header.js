import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

import { Colors } from '../../styles/colors';
import { Sizes } from '../../styles/sizes';
import { scale } from '../../styles/scale';

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.statusBar} />
        <View style={[styles.header]}>
          <View style={styles.title}>{this.renderTitle()}</View>
          <View style={styles.iconSection}>{this.renderLeftSection()}</View>
          <View style={styles.iconSection}>{this.renderRightSection()}</View>
        </View>
      </View>
    );
  }

  renderTitle() {
    if (this.props.title) {
      return (
        <Text accessibilityLabel="header_title" style={styles.titleText} numberOfLines={1}>
          {this.props.title}
        </Text>
      );
    } else {
      return null;
    }
  }

  renderLeftSection() {
    return this.props.leftSection || <View style={styles.iconPlaceholder} />;
  }

  renderRightSection() {
    return this.props.rightSection || null;
  }
}

Header.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

Header.defaultProps = {
  title: '',
  color: Colors.darkGreyBlue
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Sizes.header.headerHeight,
    padding: 0,
    alignSelf: 'stretch'
  },
  statusBar: {
    height: Sizes.header.statusBarHeight
  },
  iconSection: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: Sizes.header.textSize,
    lineHeight: scale(22),
    fontFamily: 'sale-text-semibold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  iconPlaceholder: {
    backgroundColor: 'transparent',
    height: '100%',
    width: scale(44),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Header;
