import url from 'url';
import { ApiResult } from '../../apiDefine';
import Client from '../../client';

export async function search(searchRequest: PL.API.SearchRequest): Promise<ApiResult> {
  return Client.request({
    method: 'get',
    url: url.format({
      ...Client.getServerConfig('pl'),
      pathname: 'api/search',
      query: searchRequest
    })
  });
}

export async function getProductDetail(sku: string): Promise<ApiResult> {
  return Client.request({
    method: 'get',
    url: url.format({
      ...Client.getServerConfig('pl'),
      pathname: `api/product/${sku}`
    })
  });
}
