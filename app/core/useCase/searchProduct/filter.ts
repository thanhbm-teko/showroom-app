export interface ProductFilterData {
  category: string;
  priceFrom: number;
  priceTo: number;
}

export function getInitialFilterData(): ProductFilterData {
  return {
    category: null,
    priceFrom: 0,
    priceTo: Number.MAX_SAFE_INTEGER
  };
}

export function setFilterCategory(filter: ProductFilterData, category: string): ProductFilterData {
  return { ...filter, category };
}

export function setFilterPrice(filter: ProductFilterData, priceFrom: number, priceTo: number): ProductFilterData {
  return { ...filter, priceFrom, priceTo };
}
