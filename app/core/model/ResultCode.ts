export enum ResultCode {
  Success = 0,
  Failure = 1
}

export interface ResultCodeMessage {
  code: number;
  message: string;
}
