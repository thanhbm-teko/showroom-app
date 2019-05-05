import { createStackNavigator } from 'react-navigation';

import CustomerInfoScreen from '../Screens/CustomerInfoScreen';
import ProductSearchScreen from '../Screens/ProductSearchScreen';

const MainStackNavigator = createStackNavigator({
  Home: ProductSearchScreen
});

export default MainStackNavigator;
