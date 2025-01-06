import { IProductCatalogItem } from "../../../models/IProductCatalogItem";

export interface IPacktProductFormCustomizerState {
    product: IProductCatalogItem | null;
    error: string | null;
}