import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { Sizes } from '../../styles/sizes';
import { Colors } from '../../styles/colors';
import { scale } from '../../styles/scale';

export default class ModalHeader extends PureComponent {
  renderHeaderButton = button => {
    return (
      <TouchableOpacity onPress={button.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>{button.text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderLeftButton = button => {
    if (!button) return null;

    return <View style={styles.left}>{this.renderHeaderButton(button)}</View>;
  };

  renderRightButton = button => {
    if (!button) return null;

    return <View style={styles.right}>{this.renderHeaderButton(button)}</View>;
  };

  render() {
    const { title, leftButton, rightButton } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {this.renderLeftButton(leftButton)}
        {this.renderRightButton(rightButton)}
      </View>
    );
  }
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftButton: PropTypes.shape({
    text: PropTypes.string,
    onPress: PropTypes.func
  }),
  rightButton: PropTypes.shape({
    text: PropTypes.string,
    onPress: PropTypes.func
  })
};

const styles = StyleSheet.create({
  container: {
    height: scale(43),
    backgroundColor: 'white',
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    flexDirection: 'row',
    paddingHorizontal: Sizes.padding.smaller,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray
  },
  titleContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: Sizes.s15,
    fontWeight: 'bold',
    color: Colors.black
  },
  left: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%'
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%'
  },
  button: {
    height: '100%',
    paddingHorizontal: Sizes.padding.smaller,
    justifyContent: 'center'
  },
  buttonTitle: {
    fontSize: Sizes.s15,
    color: Colors.secondary
  }
});
