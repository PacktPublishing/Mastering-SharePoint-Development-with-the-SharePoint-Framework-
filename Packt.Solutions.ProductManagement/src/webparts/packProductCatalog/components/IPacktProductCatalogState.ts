import { IProductCatalogItem } from "../../../models/IProductCatalogItem";

export interface IPacktProductCatalogState {
    productItems: IProductCatalogItem[],
    errorMessage: string
}