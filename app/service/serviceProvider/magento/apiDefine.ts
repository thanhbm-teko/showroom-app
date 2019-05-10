namespace Magento {
  export interface ImagePosition {
    url: string;
    position: string;
  }

  export interface Image {
    base_image: string;
    base_image_smallsquare: string;
    image: ImagePosition[];
  }

  export interface Product {
    id: string;
    name: string;
    source_url: Image;
    sku: string;
    price: string;
    final_price: number;
    image: Image;
    description: string;
    attributes: {
      displayAttr: string;
    };
  }
}
