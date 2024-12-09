import { IProductCatalogItem } from "../models/IProductCatalogItem";

export interface IProductCatalogService {
  getProducts(siteId: string, listName: string, itemsCount?: number, searchQuery?: string): Promise<IProductCatalogItem[]>;
  getProductById(siteId: string, listName: string, productId: string): Promise<IProductCatalogItem | null>;
  updateProduct(siteId: string, listName: string, productId: string, product: IProductCatalogItem): Promise<void>;
  createProduct(siteId: string, listName: string, product: IProductCatalogItem): Promise<void>;
}