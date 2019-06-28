export class SearchRequestBuilder {
  searchRequest: PL.API.SearchRequest;

  constructor(channel: PL.Channel, terminal: string, visitorId: string) {
    this.searchRequest = { channel, terminal, visitorId, _page: 1, _limit: 10 };
  }

  setPage(page: number): SearchRequestBuilder {
    this.searchRequest._page = page;
    return this;
  }

  query(q: string): SearchRequestBuilder {
    this.searchRequest.q = q;
    return this;
  }

  sortBy(type: PL.SortType, branchCode: string): SearchRequestBuilder {
    this.searchRequest._sort = type === 'stock' && branchCode ? `stock_${branchCode}` : type;
    return this;
  }

  orderBy(type: PL.OrderType): SearchRequestBuilder {
    this.searchRequest._order = type;
    return this;
  }

  filterByPrice(priceGte: number, priceLte: number): SearchRequestBuilder {
    if (priceGte) this.searchRequest.price_gte = priceGte;
    if (priceLte) this.searchRequest.price_lte = priceLte;
    return this;
  }

  filterCategories(categories: string[]): SearchRequestBuilder {
    this.searchRequest.categories = categories.join(',');
    return this;
  }

  build(): PL.API.SearchRequest {
    return this.searchRequest;
  }
}
