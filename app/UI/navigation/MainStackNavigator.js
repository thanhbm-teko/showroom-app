import { createStackNavigator } from 'react-navigation';

import CustomerInfoScreen from '../screens/customerInfoScreen';
import ProductSearchScreen from '../screens/productSearchScreen';

const MainStackNavigator = createStackNavigator({
  Home: ProductSearchScreen
});

export default MainStackNavigator;
