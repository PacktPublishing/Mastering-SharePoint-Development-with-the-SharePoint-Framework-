import { IProductCatalogService } from "../../../services/IProductCatalogService";

export interface ILowStockInformerProps {
    productCatalogService: IProductCatalogService;
    siteId: string;
    listName: string;
    listUrl: string;
}
