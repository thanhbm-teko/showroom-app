export enum ProductSearchSortMode {
  stock = 'stock',
  price = 'price'
}

export interface ProductSortData {
  mode: ProductSearchSortMode;
  isAscending: boolean;
  stockLocation: string;
}

export function getInitialSortData(): ProductSortData {
  return {
    mode: ProductSearchSortMode.stock,
    isAscending: false,
    stockLocation: ''
  };
}

export function setSortByPrice(isAscending: boolean = true): ProductSortData {
  return {
    mode: ProductSearchSortMode.price,
    isAscending,
    stockLocation: ''
  };
}

export function setSortByStock(stockLocation: string, isAscending: boolean = true): ProductSortData {
  return {
    mode: ProductSearchSortMode.stock,
    isAscending,
    stockLocation
  };
}
