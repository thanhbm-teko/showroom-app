import he from 'he';
import { FullInfoProduct } from '../../../core/model/product';
import { Attribute } from '../../../core/model/Attribute';

function convertProduct(product: FullInfoProduct, magentoProduct: Magento.Product): FullInfoProduct {
  if (magentoProduct) {
    let { image, attributes, description } = magentoProduct;
    product = product || <FullInfoProduct>{};
    product = {
      ...product,
      imageUrl: image.base_image,
      description: formatDescription(description),
      attributes: convertAttributes(attributes.displayAttr)
    };
  }
  return product;
}

function convertAttributes(attributes: string): Attribute[] {
  try {
    let attrs = JSON.parse(attributes);
    return attrs.map((a: any) => ({ name: a.display_name, value: a.display_value }));
  } catch (error) {
    return [];
  }
}

function formatDescription(description: string) {
  let d: string = null;
  if (description) {
    d = description
      .trim()
      .replace(/<br>/g, '\r\n')
      .replace(/<br( )*\/>/g, '\r\n')
      .replace(/<[A-Za-z/][^<>]*>/g, '');
    if (d.indexOf('&') !== -1 && d.indexOf(';') !== -1) {
      d = he.decode(d);
    }
  }
  return d;
}

export default {
  convertProduct,
  convertAttributes
};
