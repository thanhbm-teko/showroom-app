namespace PL {
  export interface Stock {
    branch: string;
    branchName: string;
    warehouse: string;
    warehouseName: string;
    location: string;
    locationName: string;
    storeCode: string;
    productBizType: string;
    available: number;
    reserved: number;
    onHand: number;
  }

  export interface PromotionPrice {
    channel: string;
    terminal: string;
    promotionPrice: number;
    flashSalePrice: number;
    finalPrice: number;
  }

  export interface Product {
    sku: string;
    name: string;
    displayName: string;
    url: string;
    brand: {
      code: string;
      name: string;
    };
    color: {
      code: string;
      name: string;
    };
    status: {
      sale: string;
      publish: boolean;
    };
    prices: {
      supplierSalePrice: number;
      sellPrice: number;
    };
    images: {
      url: string;
      priority: number;
    }[];
    promotionPrices: PromotionPrice[];
    tags: string[];
    stocks: Stock[];
    promotions: {
      channel: string;
      terminal: string;
      definitions: PPM.Promotion[];
    }[];
    flashSales: PPM.FlashSale[];
  }

  export interface KeyWord {
    keyword: string;
    highlight: string;
    brands: string[];
    categories: string[];
  }

  export interface Filter {
    total: number;
    code: string;
    name: string;
    values: {
      count: number;
      option: number;
      value: string;
    }[];
  }

  export interface SearchResponse {
    code: string;
    result: {
      products: Product[];
      keywords: KeyWord[];
      filters: Filter[];
    };
    extra: {
      totalItems: number;
      page: number;
      pageSize: number;
    };
  }
}
