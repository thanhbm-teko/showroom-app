import {
  setQuery,
  searchProduct,
  searchMoreProduct,
  getInitialSearchData,
  ProductSearchData,
  DEFAULT_LIMIT
} from '../searchProduct';
import { ResultCode } from '../../../model/ResultCode';
import ServiceLocator from '../../../service/serviceLocator';
import { ProductSearchResult } from '../../../service/product/interface';

import SEARCH_RESULTS from './__fixtures__/search_results.json';
import MORE_SEARCH_RESULTS from './__fixtures__/search_more_results.json';

let mockSearchSuccessWResults = async () =>
  <ProductSearchResult>{ code: ResultCode.Success, data: SEARCH_RESULTS, message: '' };
let mockSearchSuccessWMoreResults = async () =>
  <ProductSearchResult>{ code: ResultCode.Success, data: MORE_SEARCH_RESULTS, message: '' };
let mockSearchSuccessNoResults = async () => <ProductSearchResult>{ code: ResultCode.Success, data: [], message: '' };
let mockSearchFailureNoResults = async () => <ProductSearchResult>{ code: ResultCode.Failure, data: [], message: '' };
let searchData: ProductSearchData = null;
let newSearchData: ProductSearchData = null;

describe('setQuery', () => {
  describe('when call', () => {
    beforeEach(() => {
      searchData = getInitialSearchData();
    });

    it('should correctly set query data', () => {
      searchData = setQuery(searchData, 'abc');
      expect(searchData.query).toBe('abc');
    });

    it('should correctly trim the query', () => {
      searchData = setQuery(searchData, ' abc  d  ');
      expect(searchData.query).toBe('abc  d');
    });
  });
});

describe('searchProduct', () => {
  describe('when call success with no results', () => {
    beforeAll(async () => {
      ServiceLocator.getProductService().search = jest.fn(mockSearchSuccessNoResults);
      searchData = getInitialSearchData();
      newSearchData = await searchProduct(searchData);
    });

    it('should call ProductService.search', async () => {
      expect(ServiceLocator.getProductService().search).toBeCalledWith(
        searchData.query,
        searchData.filter,
        searchData.sort,
        0,
        DEFAULT_LIMIT
      );
    });

    it('should keep the query, filter and sort as they were', async () => {
      expect(newSearchData.query).toBe(searchData.query);
      expect(newSearchData.filter).toEqual(searchData.filter);
      expect(newSearchData.sort).toEqual(searchData.sort);
    });

    it('should correctly set return value from ProductService.search', async () => {
      expect(newSearchData.lastResultCode).toBe(ResultCode.Success);
      expect(newSearchData.results).toEqual([]);
    });

    it('should keep the limit and increase the offset', async () => {
      expect(newSearchData.limit).toBe(searchData.limit);
      expect(newSearchData.offset).toBe(searchData.offset + searchData.limit);
    });
  });

  describe('when search success with results', () => {
    it('should correctly set the return data', async () => {
      ServiceLocator.getProductService().search = jest.fn(mockSearchSuccessWResults);
      searchData = getInitialSearchData();
      searchData = await searchProduct(searchData);

      expect(searchData.lastResultCode).toBe(ResultCode.Success);
      expect(searchData.results).toEqual(SEARCH_RESULTS);
    });
  });

  describe('when call failure', () => {
    beforeAll(async () => {
      ServiceLocator.getProductService().search = jest.fn(mockSearchFailureNoResults);
      searchData = getInitialSearchData();
      newSearchData = await searchProduct(searchData);
    });

    it('should correctly set return value from ProductService.search', async () => {
      expect(newSearchData.lastResultCode).toBe(ResultCode.Failure);
    });

    it('should reset the searchData', async () => {
      searchData = getInitialSearchData();
      expect(newSearchData.query).toBe(searchData.query);
      expect(newSearchData.filter).toEqual(searchData.filter);
      expect(newSearchData.sort).toEqual(searchData.sort);
      expect(newSearchData.results).toEqual(searchData.results);
      expect(newSearchData.limit).toBe(searchData.limit);
      expect(newSearchData.offset).toBe(searchData.offset);
    });
  });
});

describe('searchMoreProduct', () => {
  async function doSearch() {
    ServiceLocator.getProductService().search = jest.fn(mockSearchSuccessWResults);
    searchData = getInitialSearchData();
    searchData = await searchProduct(searchData);
  }

  describe('when call success with no results', () => {
    beforeAll(async () => {
      await doSearch();
      ServiceLocator.getProductService().search = jest.fn(mockSearchSuccessNoResults);
      newSearchData = await searchMoreProduct(searchData);
    });

    it('should call ProductService.search', async () => {
      expect(ServiceLocator.getProductService().search).toBeCalledWith(
        searchData.query,
        searchData.filter,
        searchData.sort,
        DEFAULT_LIMIT,
        DEFAULT_LIMIT
      );
    });

    it('should correctly set return value from ProductService.search', async () => {
      expect(newSearchData.lastResultCode).toBe(ResultCode.Success);
      expect(newSearchData.results).toEqual(SEARCH_RESULTS);
    });

    it('should keep the query, filter and sort as they were', async () => {
      expect(newSearchData.query).toBe(searchData.query);
      expect(newSearchData.filter).toEqual(searchData.filter);
      expect(newSearchData.sort).toEqual(searchData.sort);
    });

    it('should keep the limit and increase the offset', async () => {
      expect(newSearchData.limit).toBe(searchData.limit);
      expect(newSearchData.offset).toBe(searchData.offset + searchData.limit);
    });
  });

  describe('when call success with more results', () => {
    it('should correctly set return value from ProductService.search', async () => {
      await doSearch();
      ServiceLocator.getProductService().search = jest.fn(mockSearchSuccessWMoreResults);
      searchData = await searchMoreProduct(searchData);
    });
  });

  describe('when call failure with no results', () => {
    beforeAll(async () => {
      await doSearch();
      ServiceLocator.getProductService().search = jest.fn(mockSearchFailureNoResults);
      newSearchData = await searchMoreProduct(searchData);
    });

    it('should correctly set return value from ProductService.search', async () => {
      expect(newSearchData.lastResultCode).toBe(ResultCode.Failure);
    });

    it('should keep everything', async () => {
      expect(newSearchData.query).toBe(searchData.query);
      expect(newSearchData.filter).toEqual(searchData.filter);
      expect(newSearchData.sort).toEqual(searchData.sort);
      expect(newSearchData.results).toEqual(searchData.results);
      expect(newSearchData.limit).toBe(searchData.limit);
      expect(newSearchData.offset).toBe(searchData.offset);
    });
  });
});
