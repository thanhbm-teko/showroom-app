namespace Pvis {
  export interface SalePrice {
    promotion_price: number;
    type: number;
    begun_at: string;
    ended_at: string;
  }

  export interface Gift {
    branch_code: string;
    required_quantity: number;
    begun_at: string;
    ended_at: string;
    type: number;
    gift: string;
    gift_alt: string;
    gift_quantity: number;
    gift_quantity_limited: boolean;
    gift_alt_quantity_limited: boolean;
    apply_for: number;
  }

  export interface Note {
    note: string;
    begun_at: string;
    ended_at: string;
    apply_for: number;
  }

  export interface Promotion {
    gift: Gift[];
    sale_price: SalePrice[];
    membership: any[];
    grand_total: any[];
    leaflets: any[];
    notes: Note[];
  }

  export interface StoreInStock {
    store_name: string;
    quantity: number;
    store_type: string;
    store_status: number;
    branch_id: string;
  }

  export interface BranchInStock {
    branch_name: string;
    quantity: number;
    sale_quantity: number;
  }

  export interface Product {
    promotions: Promotion;
    sku: string;
    sale_point: number;
    category: string;
    name: string;
    description: string;
    highlight: string;
    image: string;
    warranty: number;
    price_wo_vat: number;
    price_w_vat: number;
    original_price: number;
    promotion_price: number;
    attributes: any[];
    created_at: string;
    hcc: number;
    in_bg: number;
    sh: number;
    k_nhap: number;
    web: number;
    store_in_stock: {
      [store_id: string]: StoreInStock;
    };
    branch_in_stock: {
      [branch_id: string]: BranchInStock;
    };
    total_in_stock: number;
    status: number;
    sale_in_stock: number;
  }
}
