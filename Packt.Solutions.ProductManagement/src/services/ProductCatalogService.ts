import { Log } from "@microsoft/sp-core-library";
import {
  IProductCatalogItem,
  ProductSizes
} from "../models/IProductCatalogItem";
import { IProductCatalogService } from "./IProductCatalogService";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export class ProductCatalogService implements IProductCatalogService {
  private _sp: SPFI;

  constructor(sp: SPFI) {
    this._sp = sp;
  }
  
  public async getProducts(
    listName: string,
    itemsCount?: number,
  ): Promise<IProductCatalogItem[]> {

    // SharePoint columns for a product
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

      let items: IProductCatalogItem[] = await this._sp.web.lists
                                      .getByTitle(listName).items
                                      .select(...fields)
                                      .top(itemsCount ? itemsCount : 50)();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items = items.map((item: any) => {
        return {
          modelName: item.packtProductModelName,
          lastOrderDate: item.packtProductStockLastOrderDate
            ? new Date(item.packtProductStockLastOrderDate)
            : null,
          productReference: item.packtProductReference,
          stockLevel: item.packtProductStockLevel,
          size: item.fields as ProductSizes,
          retailPrice: item.packtProductRetailPrice,
          itemColour: item.packtProductColor,
          itemPicture: item.packtProductItemPicture
            ? JSON.parse(item.packtProductItemPicture).serverRelativeUrl
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
