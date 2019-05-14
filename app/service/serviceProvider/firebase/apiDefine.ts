namespace Firebase {
  export interface DateSlot {
    startDate: number;
    endDate: number;
  }

  export interface TimeSlot {
    startTime: number;
    endTime: number;
  }

  export namespace LegacyPromotion {
    export interface DataBlock {
      promotionSkus: string[];
      quantity: number;
      sku: string;
    }

    export interface Condition {
      branches: string[];
      date: DateSlot;
    }

    export interface Detail extends Condition {
      key: string;
      name: string;
      priority: number;
      banner_url: string;
      time: TimeSlot[];
      data: { [key: string]: DataBlock };
    }
  }
}
