export interface IProductCatalogItem {
  modelName: string;
  retailPrice: number;
  stockLevel: number;
  lastOrderDate: Date;
  itemPicture: string;
  itemColour: string;
  size: ProductSizes;
  productReference: string;
}

export enum ProductSizes {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
}
