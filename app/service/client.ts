import axios, { AxiosRequestConfig } from 'axios';
import { ApiResult } from './apiDefine';

export type Protocol = 'http' | 'https';
export type Env = 'dev' | 'qc' | 'staging' | 'production';

export interface ServerDetailConfig {
  host: string;
  protocol?: Protocol;
}

export interface ServerConfig {
  env: Env;
  logEnabled: boolean;
  protocol: Protocol;
  services: { [name: string]: ServerDetailConfig };
}

class Client {
  config: ServerConfig;

  initialize(serverConfig: ServerConfig) {
    this.config = serverConfig;
  }

  log(...args: any[]) {
    if (this.config.logEnabled) {
      console.log(...args);
    }
  }

  getServerConfig(serverName: string): ServerDetailConfig {
    return this.config.services[serverName]
      ? {
          protocol: this.config.protocol,
          ...this.config.services[serverName]
        }
      : null;
  }

  async request(config: AxiosRequestConfig): Promise<ApiResult> {
    let urlDetail = `[${config.method}]: ${config.url}`;
    try {
      this.log(`REQUEST ${urlDetail}`);
      this.log(`PARAMS: `, config.params);

      let response = await axios(config);

      this.log(`RESPONSE ${urlDetail}`);
      this.log(`DATA: `, response.data);

      return {
        ok: true,
        data: response.data,
        message: response.statusText
      };
    } catch (error) {
      this.log(`RESPONSE ${urlDetail}`);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        this.log(`DATA: `, error.response.data);
        return {
          ok: false,
          data: error.response.data,
          message: error.response.statusText
        };
      } else {
        // The request was made but no response was received
        // or something happened in setting up the request that triggered an Error
        this.log(`ERROR: `, error.message);
        return {
          ok: false,
          data: null,
          message: error.message
        };
      }
    }
  }
}

export default new Client();
