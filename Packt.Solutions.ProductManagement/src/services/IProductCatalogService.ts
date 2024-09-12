import { IProductCatalogItem } from "../models/IProductCatalogItem";

export interface IProductCatalogService {
  getProducts(siteId: string, listName: string, itemsCount?: number, searchQuery?: string): Promise<IProductCatalogItem[]>;
}