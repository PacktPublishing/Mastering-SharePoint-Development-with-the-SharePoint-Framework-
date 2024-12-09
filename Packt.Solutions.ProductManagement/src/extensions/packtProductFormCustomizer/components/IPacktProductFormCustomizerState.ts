import { IProductCatalogItem } from "../../../models/IProductCatalogItem";

export interface IPacktProductFormCustomizerState {
    product: IProductCatalogItem | null;
    loading: boolean;
    error: string | null;
}