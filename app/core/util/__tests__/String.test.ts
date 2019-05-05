import Util from '..';

describe('generateUuid', () => {
  it('should return uuid string when called', () => {
    let uuid = Util.String.generateUuid();
    expect(uuid).toMatch(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
  });
});

describe('formatPrice', () => {
  it('should return formatted price when called with number', () => {
    let formatString = Util.String.formatPrice(10000);
    expect(formatString).toEqual('10.000 \u20ab');
  });

  it('should return formatted price when called with string', () => {
    let formatString = Util.String.formatPrice('100000');
    expect(formatString).toEqual('100.000 \u20ab');
  });

  it('should return formatted price when called with null/undefined', () => {
    let formatString = Util.String.formatPrice(null);
    expect(formatString).toEqual('0 \u20ab');
    formatString = Util.String.formatPrice(undefined);
    expect(formatString).toEqual('0 \u20ab');
  });
});
