import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { MenuProvider } from 'react-native-popup-menu';

import store from './app/UI/reduxConnector/configureStore';
import ServiceLocator from './app/core/service/serviceLocator';
import AppNavigator from './app/UI/navigation/AppNavigator';
import ServiceMapConfig from './app/service/serviceMapConfig';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <MenuProvider>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </MenuProvider>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'sale-text-italic': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-Italic.ttf'),
          android: require('./assets/fonts/android/Roboto-Italic.ttf')
        }),
        'sale-text-light': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-Light.ttf'),
          android: require('./assets/fonts/android/Roboto-Light.ttf')
        }),
        'sale-text-light-italic': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-LightItalic.ttf'),
          android: require('./assets/fonts/android/Roboto-LightItalic.ttf')
        }),
        'sale-text-medium': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-Medium.ttf'),
          android: require('./assets/fonts/android/Roboto-Medium.ttf')
        }),
        'sale-text-regular': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-Regular.ttf'),
          android: require('./assets/fonts/android/Roboto-Regular.ttf')
        }),
        'sale-text-bold': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-Bold.ttf'),
          android: require('./assets/fonts/android/Roboto-Bold.ttf')
        }),
        'sale-text-semibold': Platform.select({
          ios: require('./assets/fonts/ios/SF-UI-Text-Semibold.ttf'),
          android: require('./assets/fonts/android/Roboto-Medium.ttf')
        })
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    ServiceLocator.setContext(ServiceMapConfig);
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
