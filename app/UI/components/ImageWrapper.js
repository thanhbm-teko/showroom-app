import React, { Component } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { FileSystem } from 'expo';

const USE_IMAGE_CACHE = true;
const CHECK_MEDIA_EXT = false;
const MEDIA_EXT = [
  '.png',
  '.jpg',
  '.bmp',
  '.gif',
  '.psd',
  '.jpeg',
  '.webp',
  '.PNG',
  '.JPG',
  '.BMP',
  '.GIF',
  '.PSD',
  '.JPEG',
  '.WEBP'
];

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
    this.downloadImage = this.downloadImage.bind(this);
    this.state = {
      step: STEP.TRY_LOCAL
    };
  }

  componentWillReceiveProps(nextProps) {
    if (USE_IMAGE_CACHE) {
      if (nextProps.source !== this.props.source && this.state.step !== STEP.TRY_LOCAL) {
        this.setState({ step: STEP.TRY_LOCAL });
      }
    }
  }

  getLocalFileUri(path) {
    if (path) {
      let i = path.lastIndexOf('/');
      if (i !== -1 && i < path.length - 1) {
        return FileSystem.cacheDirectory + 'product_image_' + encodeURIComponent(path.slice(i + 1));
      }
    }
    return null;
  }

  downloadImage(localUri) {
    if (localUri) {
      if (!CHECK_MEDIA_EXT || MEDIA_EXT.indexOf(localUri.slice(-4)) !== -1 || MEDIA_EXT.indexOf(localUri.slice(-5)) !== -1) {
        FileSystem.downloadAsync(this.props.source, localUri)
          .then(({ uri, status }) => {
            if (status === 200) {
              this.setState({ step: STEP.USE_LOCAL });
            } else {
              this.setState({ step: STEP.USE_DEFAULT });
              // android still download the file if 404 :v so need to delete it...
              FileSystem.deleteAsync(uri, {}, true);
            }
          })
          .catch(error => {
            this.setState({ step: STEP.USE_ONLINE });
          });
      } else {
        this.setState({ step: STEP.USE_ONLINE });
      }
    } else {
      this.setState({ step: STEP.USE_DEFAULT });
    }
  }

  render() {
    let { style, resizeMode, source } = this.props;
    if (USE_IMAGE_CACHE) {
      if (this.state.step === STEP.TRY_LOCAL || this.state.step === STEP.USE_LOCAL) {
        let localUri = this.getLocalFileUri(source);
        return (
          <Image
            style={style}
            resizeMode={resizeMode}
            source={localUri ? { isStatic: true, uri: localUri } : require('../resources/images/no_product.png')}
            onError={() => {
              if (this.state.step === STEP.TRY_LOCAL) {
                this.setState({ step: STEP.DOWNLOADING }, () => this.downloadImage(localUri));
              } else {
                this.setState({ step: STEP.USE_DEFAULT });
              }
            }}
          />
        );
      } else if (this.state.step === STEP.DOWNLOADING) {
        return (
          <View style={[this.props.style, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" />
          </View>
        );
      } else {
        return (
          <Image
            style={style}
            resizeMode={resizeMode}
            source={this.state.step === STEP.USE_ONLINE ? { uri: source } : require('../resources/images/no_product.png')}
            onError={() => this.setState({ step: STEP.USE_DEFAULT })}
          />
        );
      }
    } else {
      return (
        <Image
          style={style}
          resizeMode={resizeMode}
          source={
            source && this.state.step !== STEP.USE_DEFAULT ? { uri: source } : require('../resources/images/no_product.png')
          }
          onError={() => this.setState({ step: STEP.USE_DEFAULT })}
        />
      );
    }
  }
}

export default ImageWrapper;
