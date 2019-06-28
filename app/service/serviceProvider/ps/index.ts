import url from 'url';
import { ApiResult } from '../../apiDefine';
import { ProductFilterData } from '../../../core/useCase/searchProduct/filter';
import { ProductSortData } from '../../../core/useCase/searchProduct/sort';
import Client from '../../client';

export async function search(
  query: string,
  filter: ProductFilterData,
  sort: ProductSortData,
  offset: number,
  limit: number
): Promise<ApiResult> {
  let page = Math.floor(offset / limit);
  return Client.request({
    method: 'get',
    url: url.format({
      ...Client.getServerConfig('ps'),
      pathname: 'api',
      query: {
        query,
        page,
        mode: 'operator',
        channelId: 'offline',
        userId: 'test-test-test-test'
      }
    })
  });
}
