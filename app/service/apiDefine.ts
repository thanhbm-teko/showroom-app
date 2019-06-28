export interface ApiResult {
  ok: boolean;
  data: any;
  message: string;
}

export function getDefaultApiResult(data: any = null): ApiResult {
  return {
    ok: false,
    message: '',
    data
  };
}
