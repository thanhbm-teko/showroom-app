import { ResultCode } from '../../model/ResultCode';
import { FullInfoProduct } from '../../model/Product';
import ServiceLocator from '../../service/serviceLocator';

interface ProductDetailData {
  detail: FullInfoProduct;
  updatedAt: number;
}

export interface ProductDetailsData {
  lastResultCode: ResultCode;
  skus: { [sku: string]: ProductDetailData };
}

export function getInitialDetailData(): ProductDetailsData {
  return {
    lastResultCode: ResultCode.Success,
    skus: {}
  };
}

export async function fetchProductDetail(detailData: ProductDetailsData, sku: string): Promise<ProductDetailsData> {
  let newDetailData = { ...detailData };
  let res = await ServiceLocator.getProductService().getDetail(sku);
  if (res.code === ResultCode.Success) {
    newDetailData.skus = {
      ...detailData.skus,
      [sku]: {
        detail: res.data,
        updatedAt: Date.now()
      }
    };
  }

  newDetailData.lastResultCode = res.code;
  return newDetailData;
}

export function getProductDetail(detailData: ProductDetailsData, sku: string): FullInfoProduct {
  return detailData.skus[sku] ? detailData.skus[sku].detail : null;
}
