namespace PS {
  export interface Product {
    hot: boolean;
    new: boolean;
    promo: boolean;
    pv_sku: string;
    name: string;
    seo_name: string;
    category_name: string;
    asia_category_code: string;
    warranty: string;
    url: string;
    url_key: string;
    image: string;
    image200_pre: string;
    image60_pre: string;
    image_200: string;
    image_full: string;
    status: number;
    magento_status: number;
    price: number;
    price_w_vat: number;
    original_price: number;
    promotions: Pvis.Promotion;
    sale_in_stock: number;
    total_in_stock: number;
    store_in_stock: Pvis.StoreInStock[];
    branch_in_stock: Pvis.BranchInStock[];
  }

  export namespace API {
    export interface SearchResponse {
      data: {
        data: {
          products: Product[];
        };
      };
    }
  }
}
