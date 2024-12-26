import { Log } from "@microsoft/sp-core-library";
import {
  IProductCatalogItem,
  ProductSizes,
} from "../models/IProductCatalogItem";
import { IProductCatalogService } from "./IProductCatalogService";
import { SPHttpClient } from "@microsoft/sp-http";
//import { MSGraphClientV3 } from "@microsoft/sp-http";

export class ProductCatalogService implements IProductCatalogService {
  //private _msGraphClient: MSGraphClientV3;
  private _spHttpClient: SPHttpClient;
  private _webUrl: string;

  /*constructor(msGraphClient: MSGraphClientV3) {
    this._msGraphClient = msGraphClient;
  }*/

  constructor(spHttpClient: SPHttpClient, webUrl: string) {
    this._spHttpClient = spHttpClient;
    this._webUrl = webUrl;
  }

  // Example using SharePoint REST API and SPHttpClient
  public async getProducts(
    siteId: string,
    listName: string
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

    const response = await this._spHttpClient.get(
      `${this._webUrl}/_api/web/lists/GetByTitle('${listName}')/items?$select=${fields}`,
      SPHttpClient.configurations.v1);
    
    if (response.ok) {
      const responseJson = await response.json();

      const items: IProductCatalogItem[] = responseJson.value.map((item: any) => {
        return {
          modelName: item.packtProductModelName,
          lastOrderDate: item.packtProductStockLastOrderDate
            ? new Date(item.packtProductStockLastOrderDate)
            : null,
          productReference: item.packtProductReference,
          stockLevel: item.packtProductStockLevel,
          size: item.packtProductSize as ProductSizes,
          retailPrice: item.packtProductRetailPrice,
          itemColour: item.packtProductColor,
          itemPicture: item.packtProductItemPicture
            ? JSON.parse(item.packtProductItemPicture).serverRelativeUrl
            : null,
        } as IProductCatalogItem;
      });
      
      return items;
    } else {
      Log.error("ProductCatalogService", new Error(response.statusText));
      return [];
    }
  }
  
  // Example using Microsoft Graph API and MSGraphClientV3
  /*
  public async getProducts(
    siteId: string,
    listName: string
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
  }*/
}
