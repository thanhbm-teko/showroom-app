import { ProductFilterData, getInitialFilterData, setFilterCategory, setFilterPrice } from '../filter';

describe('setFilterCategory', () => {
  describe('when called', () => {
    it('should correctly set filter category', () => {
      let filter: ProductFilterData = getInitialFilterData();
      filter = setFilterCategory(filter, '04-N001');
      expect(filter.category).toBe('04-N001');
    });
  });
});

describe('setFilterPrice', () => {
  describe('when called', () => {
    it('should correctly set filter price', () => {
      let filter: ProductFilterData = getInitialFilterData();
      filter = setFilterPrice(filter, 0, 100000);
      expect(filter.priceFrom).toBe(0);
      expect(filter.priceTo).toBe(100000);
    });
  });
});
