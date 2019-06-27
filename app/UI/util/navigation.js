import { NavigationActions, StackActions } from 'react-navigation';

export function resetToCart(params = {}) {
  return StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: 'Cart', params })]
  });
}

export function resetToOrderList(tabIndex) {
  return StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'OrderList',
        params: { tabIndex }
      })
    ]
  });
}
