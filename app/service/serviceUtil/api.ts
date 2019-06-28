import axios, { AxiosResponse, AxiosError } from 'axios';

const REQUEST_TIMEOUT = 30000;
type HttpMethod = 'get' | 'post' | 'put';

class Client {
  logEnabled: boolean = true;

  log(...args: any[]) {
    if (this.logEnabled) {
      console.log(...args);
    }
  }

  logRequest(method: HttpMethod, url: string, params: Object) {
    this.log(`REQUEST[${method}] for URL: ${url}`);
    this.log('Params: ', params);
  }

  logResponse(response: AxiosResponse) {
    this.log(`RESPONSE for URL: `, response);
  }

  async request(config: Object = {}) {
    try {
      let response = await axios({ ...config, timeout: REQUEST_TIMEOUT });
      this.logResponse(response);
    } catch (error) {
      this.logResponse(error);
    }
  }

  async get(url: string, headers: Object = {}) {
    this.logRequest('get', url, {});
    return this.request({
      url,
      method: 'get',
      headers
    });
  }

  async post(url: string, params: Object = {}, headers = {}) {
    this.logRequest('post', url, params);
    return this.request({
      url,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      data: params
    });
  }

  async put(url: string, params: Object = {}, headers = {}) {
    this.logRequest('put', url, params);
    return this.request({
      url,
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      data: params
    });
  }
}

export default new Client();
