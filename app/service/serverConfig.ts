import { ServerConfig, Protocol, Env } from './client';

const servicesByEnv = {
  dev: {
    sso: {
      host: 'acc.teko.vn'
    },
    pl: {
      host: 'listing-dev.teko.vn'
    },
    wms: {
      host: 'test.api-wms.phongvu.vn'
    },
    os: {
      host: 'test.offlinesales.teksvr.com'
    },
    magento: {
      host: 'dev.tekshop.vn'
    },
    pvis: {
      host: 'dev-pvis.teko.vn'
    },
    crm: {
      host: 'dev-crm.teko.vn'
    },
    stn: {
      host: 'test.stn.teksvr.com'
    },
    log: {
      host: 'logis-garage.teksvr.com'
    },
    om: {
      protocol: <Protocol>'http',
      host: 'om-dev.teko.vn'
    },
    wp: {
      host: 'pvreport.000webhostapp.com'
    },
    ps: {
      host: 'search-dev.phongvu.vn'
    }
  },
  qc: {},
  staging: {},
  production: {}
};

export function getConfig(env: Env): ServerConfig {
  return {
    env,
    logEnabled: true,
    protocol: 'https',
    services: servicesByEnv[env]
  };
}
