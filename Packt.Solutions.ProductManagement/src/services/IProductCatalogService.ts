import { IProductCatalogItem } from "../models/IProductCatalogItem";

export interface IProductCatalogService {
    getProducts(): Promise<IProductCatalogItem[]>;
}