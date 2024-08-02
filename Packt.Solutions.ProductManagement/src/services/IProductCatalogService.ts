import { IProductCatalogItem } from "../models/IProductCatalogItem";

export interface IProductCatalogService {
  getProducts(siteId: string, listName: string): Promise<IProductCatalogItem[]>;
}