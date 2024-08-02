import { Log } from "@microsoft/sp-core-library";
import {
  IProductCatalogItem,
  ProductSizes,
} from "../models/IProductCatalogItem";
import { IProductCatalogService } from "./IProductCatalogService";
import { MSGraphClientV3 } from "@microsoft/sp-http";

export class ProductCatalogService implements IProductCatalogService {
  private _msGraphClient: MSGraphClientV3;

  constructor(msGraphClient: MSGraphClientV3) {
    this._msGraphClient = msGraphClient;
  }

  public async getProducts(
    siteId: string,
    listName: string
  ): Promise<IProductCatalogItem[]> {

    // SharePoint columsn for a product
    const fields = [
      "packtProductColor",
      "packtProductModelName",
      "packtProductItemPicture",
      "packtProductReference",
      "packtProductRetailPrice",
      "packtProductSize",
      "packtProductStockLastOrderDate",
      "packtProductStockLevel"
    ];

    try {

      const response = await this._msGraphClient
            .api(`sites/${siteId}/lists/${listName}/items`)
            .expand(`fields($select=${fields})`)
            .get();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const items: IProductCatalogItem[] = response.value.map((item: any) => {
            return {
              modelName: item.fields.packtProductModelName,
              lastOrderDate: item.fields.packtProductStockLastOrderDate
                ? new Date(item.fields.packtProductStockLastOrderDate)
                : null,
              productReference: item.fields.packtProductReference,
              stockLevel: item.fields.packtProductStockLevel,
              size: item.fields.packtProductSize as ProductSizes,
              retailPrice: item.fields.packtProductRetailPrice,
              itemColour: item.fields.packtProductColor,
              itemPicture: item.fields.packtProductItemPicture
                ? JSON.parse(item.fields.packtProductItemPicture).serverRelativeUrl
                : null,
            } as IProductCatalogItem;
          });

          return items;
    } catch (error) {
      Log.error("ProductCatalogService", error);
      return [];
    }
    
  }
}
