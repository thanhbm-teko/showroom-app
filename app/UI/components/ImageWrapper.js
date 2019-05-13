import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { FileSystem } from 'expo';

const USE_IMAGE_CACHE = true;
const DEFAULT_IMAGE_PATH = '../../../assets/images/no_product.png';
export const STEP = {
  TRY_LOCAL: 0,
  DOWNLOADING: 1,
  USE_LOCAL: 2,
  USE_ONLINE: 3,
  USE_DEFAULT: 4
};

class ImageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: STEP.TRY_LOCAL,
      localUri: ImageWrapper.getLocalFileUri(props.source)
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { step, localUri } = prevState;
    if (USE_IMAGE_CACHE) {
      let newLocalUri = ImageWrapper.getLocalFileUri(nextProps.source);
      if (newLocalUri !== localUri) {
        step = STEP.TRY_LOCAL;
        localUri = newLocalUri;
      }
    }

    return { step, localUri };
  }

  static getLocalFileUri = path => {
    if (path) {
      let i = path.lastIndexOf('/');
      if (i !== -1 && i < path.length - 1) {
        return FileSystem.cacheDirectory + 'product_image_' + encodeURIComponent(path.slice(i + 1));
      }
    }
    return null;
  };

  downloadImage = async () => {
    let { step, localUri } = this.state;
    try {
      let ret = await FileSystem.downloadAsync(this.props.source, localUri);
      if (ret.status === 200) {
        step = STEP.USE_LOCAL;
      } else {
        step = STEP.USE_DEFAULT;
        // android still download the file if 404 :v so need to delete it...
        FileSystem.deleteAsync(ret.uri, {}, true);
      }
    } catch (error) {
      step = STEP.USE_ONLINE;
    }

    this.setState({ step });
  };

  onLoadLocalImageError = () => {
    let { step, localUri } = this.state;
    if (step === STEP.TRY_LOCAL && localUri) {
      this.setState({ step: STEP.DOWNLOADING }, this.downloadImage);
    } else {
      this.useDefaultImage();
    }
  };

  useDefaultImage = () => {
    this.setState({ step: STEP.USE_DEFAULT });
  };

  render() {
    if (USE_IMAGE_CACHE) {
      return this.renderImageWithCache();
    } else {
      return this.renderImage();
    }
  }

  renderImageWithCache() {
    let { style, resizeMode } = this.props;
    let { step, localUri } = this.state;

    if (step === STEP.TRY_LOCAL || step === STEP.USE_LOCAL) {
      return (
        <Image
          style={style}
          resizeMode={resizeMode}
          source={localUri ? { isStatic: true, uri: localUri } : require(DEFAULT_IMAGE_PATH)}
          onError={this.onLoadLocalImageError}
        />
      );
    } else if (step === STEP.DOWNLOADING) {
      return (
        <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return this.renderImage();
    }
  }

  renderImage() {
    let { style, resizeMode, source } = this.props;
    return (
      <Image
        style={style}
        resizeMode={resizeMode}
        source={source && this.state.step !== STEP.USE_DEFAULT ? { uri: source } : require(DEFAULT_IMAGE_PATH)}
        onError={this.useDefaultImage}
      />
    );
  }
}

export default ImageWrapper;
