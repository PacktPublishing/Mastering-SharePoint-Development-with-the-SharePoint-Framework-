import { FormDisplayMode } from "@microsoft/sp-core-library";
import { IProductCatalogService } from "../../../services/IProductCatalogService";

export interface IPacktProductFormCustomizerProps {
    productCatalogService: IProductCatalogService;
    siteId: string;
    listName: string;
    itemId: string;
    displayMode: FormDisplayMode;
    onSave: () => void;
    onClose: () => void;
}