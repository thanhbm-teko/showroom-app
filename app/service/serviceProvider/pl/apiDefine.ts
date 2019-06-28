namespace PL {
  export type Channel = 'pv_showroom' | 'pv_online' | 'pv_agent' | 'vnshop_online';
  export type SortType = 'price' | 'stock' | 'new' | 'popular';
  export type OrderType = 'asc' | 'desc';

  export interface CodeNamePair {
    code: string;
    name: string;
  }

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
    channel: Channel;
    terminal: string;
    promotionPrice: number;
    flashSalePrice: number;
    finalPrice: number;
  }

  export interface SEOInfo {
    metaKeyWord: string;
    metaTitle: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
  }

  export interface Attribute {
    code: string;
    values: {
      optionId: number;
      value: string;
    }[];
  }

  export interface AttributeGroup {
    id: number;
    name: string;
    value: string;
    parentId: number;
    priority: number;
  }

  export interface Product {
    sku: string;
    name: string;
    displayName: string;
    url: string;
    brand: CodeNamePair;
    color: CodeNamePair;
    productLine: CodeNamePair;
    attributeSet: {
      id: string;
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
    seoInfo: SEOInfo;
    magentoId: number;
  }

  export interface DetailProduct extends Product {
    taxOut: number;
    warranty: {
      months: number;
      description: string;
    };
    attributes: Attribute[];
    attributeGroups: AttributeGroup[];
    createdAt: string;
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

  export namespace API {
    export interface SearchRequest {
      channel: Channel;
      terminal: string;
      visitorId: string;
      q?: string;
      _page?: number;
      _limit?: number;
      _sort?: string;
      _order?: OrderType;
      price_gte?: number;
      price_lte?: number;
      saleStatuses?: string;
      brands?: string;
      categories?: string;
      tags?: string;
      attributeSets?: string;
      types?: string;
      objectives?: string;
      productLines?: string;
      saleCategories?: string;
      responses?: string;
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

    export interface DetailResponse {
      code: string;
      result: {
        product: DetailProduct;
      };
    }
  }
}
