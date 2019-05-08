import { createStackNavigator } from 'react-navigation';

import CustomerInfoScreen from '../screens/customerInfoScreen';
import ProductSearchScreen from '../screens/productSearchScreen';
import ProductDetailScreen from '../screens/productDetailScreen';

const MainStackNavigator = createStackNavigator({
  Home: ProductDetailScreen
});

export default MainStackNavigator;
