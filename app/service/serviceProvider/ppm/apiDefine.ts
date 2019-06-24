namespace PPM {
  export interface TimeRange {
    start: string;
    end: string;
  }

  export interface Condition {
    paymentMethods: string[];
    orderValueMin: number;
    orderValueMax: number;
    coupon: string;
  }

  export interface BudgetConstrain {
    budgetStatus: string;
    budgetId: number;
    outOfBudget: boolean;
  }

  export interface MoneyBenefit extends BudgetConstrain {
    id: number;
    money: number;
    percent: number;
    applyOn: string;
    maxDiscount: number;
    discountType: string;
  }

  export interface ItemBenefit extends BudgetConstrain {
    id: number;
    sku: string;
    name: string;
    applyOn: string;
    quantity: number;
  }

  export interface Benefit {
    money: MoneyBenefit[];
    items: ItemBenefit[];
  }

  export interface Promotion {
    id: number;
    name: string;
    description: string;
    startedAt: string;
    endedAt: string;
    type: string;
    partner: string;
    isDefault: boolean;
    govRegister: boolean;
    timeRanges: TimeRange[];
    condition: Condition;
    benefit: Benefit;
  }

  export interface FlashSale {
    channel: string;
    terminal: string;
    used: number;
    total: number;
    discountPercent: number;
    definition: {
      name: string;
      description: string;
      startedAt: string;
      endedAt: string;
      timeRanges: TimeRange[];
      paymentMethods: string[];
      type: {
        id: number;
        code: string;
        name: string;
      };
    };
  }

  export interface GetPromotionsResponse {
    code: string;
    result: {
      promotions: Promotion[];
    };
  }
}
