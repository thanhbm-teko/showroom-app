import { createStackNavigator } from 'react-navigation';

import CustomerInfoScreen from '../screens/customerInfoScreen';
import ProductSearchScreen from '../screens/productSearchScreen';
import ProductDetailScreen from '../screens/productDetailScreen';
import CartScreen from '../screens/CartScreen';

const MainStackNavigator = createStackNavigator({
  Home: CartScreen
});

export default MainStackNavigator;
