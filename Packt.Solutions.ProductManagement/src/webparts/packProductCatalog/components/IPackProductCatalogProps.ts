import { IProductCatalogService } from "../../../services/IProductCatalogService";

export interface IPackProductCatalogProps {
  productCatalogService: IProductCatalogService;
  siteId: string;
  listName: string;
  itemsCount: number;
}
