import { ProductSortData, ProductSearchSortMode, setSortByPrice, setSortByStock } from '../sort';

let sort: ProductSortData = null;

describe('setSortByPrice', () => {
  describe('when called', () => {
    beforeAll(() => {
      sort = setSortByPrice(true);
    });

    it('should correctly set sort mode to price', () => {
      expect(sort.mode).toBe(ProductSearchSortMode.price);
    });

    it('should correctly set sort order', () => {
      expect(sort.isAscending).toBe(true);
    });
  });
});

describe('setSortByStock', () => {
  describe('when called', () => {
    beforeAll(() => {
      sort = setSortByStock('CP09', true);
    });

    it('should correctly set sort mode to stock', () => {
      expect(sort.mode).toBe(ProductSearchSortMode.stock);
    });

    it('should correctly set sort order', () => {
      expect(sort.stockLocation).toBe('CP09');
    });

    it('should correctly set sort order', () => {
      expect(sort.isAscending).toBe(true);
    });
  });
});
