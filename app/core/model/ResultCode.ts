export enum ResultCode {
  Success = 0,
  Failure = 1
}

export interface ApiResult {
  code: ResultCode;
  data: any;
  message: string;
}

export function getDefaultApiResult(data: any = null): ApiResult {
  return {
    code: ResultCode.Failure,
    message: '',
    data
  };
}
