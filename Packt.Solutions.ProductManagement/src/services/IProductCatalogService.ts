import { IProductCatalogItem } from "../models/IProductCatalogItem";

export interface IProductCatalogService {
  getProducts(listName: string, itemsCount?: number): Promise<IProductCatalogItem[]>;
}