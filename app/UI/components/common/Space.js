import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export class Space extends PureComponent {
  render() {
    const { width, height } = this.props;

    return <View style={{ width, height }} />;
  }
}

Space.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Space.defaultProps = {
  width: 1,
  height: 1
};

export default Space;
