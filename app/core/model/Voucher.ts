export interface Voucher {
  key: string;
  name: string;
}

export interface VoucherWQuantity {
  voucher: Voucher;
  quantity: number;
}
