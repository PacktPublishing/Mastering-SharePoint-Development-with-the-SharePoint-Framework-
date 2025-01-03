import { Log } from "@microsoft/sp-core-library";
import {
  IProductCatalogItem,
  ProductSizes,
} from "../models/IProductCatalogItem";
import { IProductCatalogService } from "./IProductCatalogService";
import { MSGraphClientV3 } from "@microsoft/sp-http";
// import { SPHttpClient } from "@microsoft/sp-http";
// import { HttpClient } from "@microsoft/sp-http";
// import { AadHttpClient } from "@microsoft/sp-http";

export class ProductCatalogService implements IProductCatalogService {

  /* Uncomment regions according to your scenario */

  private _msGraphClient: MSGraphClientV3;
  // private _spHttpClient: SPHttpClient;
  // private _webUrl: string;
  // private _httpClient: HttpClient;
  // private _aadHttpClient: AadHttpClient;

  //#region MSGraphClientV3
  constructor(msGraphClient: MSGraphClientV3) {
    this._msGraphClient = msGraphClient;
  }
  //#endregion

  //#region SpHttpClient
  // constructor(spHttpClient: SPHttpClient, webUrl: string) {
  //   this._spHttpClient = spHttpClient;
  //   this._webUrl = webUrl;
  // }
  //#endregion

  //#region HttpClient
  // constructor(httpClient: HttpClient) {
  //   this._httpClient = httpClient;
  // }
  //#endregion

  //#region AadHttpClient
  // constructor(aadHttpClient: AadHttpClient) {
  //   this._aadHttpClient = aadHttpClient;
  // }
  //#endregion

  //#region Example using Microsoft Graph API and MSGraphClientV3
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
  }
  //#endregion

  //#region Example using SharePoint REST API and SPHttpClient
  // public async getProducts(
  //   siteId: string,
  //   listName: string
  // ): Promise<IProductCatalogItem[]> {

  //   // SharePoint columns for a product
  //   const fields = [
  //     "packtProductColor",
  //     "packtProductModelName",
  //     "packtProductItemPicture",
  //     "packtProductReference",
  //     "packtProductRetailPrice",
  //     "packtProductSize",
  //     "packtProductStockLastOrderDate",
  //     "packtProductStockLevel"
  //   ];

  //   const response = await this._spHttpClient.get(
  //     `${this._webUrl}/_api/web/lists/GetByTitle('${listName}')/items?$select=${fields}`,
  //     SPHttpClient.configurations.v1, );
    
  //   if (response.ok) {
  //     const responseJson = await response.json();

  //     const items: IProductCatalogItem[] = responseJson.value.map((item: any) => {
  //       return {
  //         modelName: item.packtProductModelName,
  //         lastOrderDate: item.packtProductStockLastOrderDate
  //           ? new Date(item.packtProductStockLastOrderDate)
  //           : null,
  //         productReference: item.packtProductReference,
  //         stockLevel: item.packtProductStockLevel,
  //         size: item.packtProductSize as ProductSizes,
  //         retailPrice: item.packtProductRetailPrice,
  //         itemColour: item.packtProductColor,
  //         itemPicture: item.packtProductItemPicture
  //           ? JSON.parse(item.packtProductItemPicture).serverRelativeUrl
  //           : null,
  //       } as IProductCatalogItem;
  //     });
  //     return items;
  //   } else {
  //     Log.error("ProductCatalogService", new Error(response.statusText));
  //     return [];
  //   }
  // }
  //#endregion
  
  //#region Example using Anonymous API and HttpClient
  // public async getProducts(
  //   siteId: string,
  //   listName: string
  // ): Promise<IProductCatalogItem[]> {

  //     const response = await this._httpClient.get("https://demospfxfunction.azurewebsites.net/api/GetProducts", HttpClient.configurations.v1);
      
  //     if (response.ok) {

  //         const responseJson = await response.json();
      
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         const items: IProductCatalogItem[] = responseJson.map((item: any) => {
  //             return {
  //               modelName: item.packtProductModelName,
  //               lastOrderDate: item.packtProductStockLastOrderDate
  //                 ? new Date(item.packtProductStockLastOrderDate)
  //                 : null,
  //               productReference: item.packtProductReference,
  //               stockLevel: item.packtProductStockLevel,
  //               size: item.packtProductSize as ProductSizes,
  //               retailPrice: item.packtProductRetailPrice,
  //               itemColour: item.packtProductColor,
  //               itemPicture: item.packtProductItemPicture
  //             } as IProductCatalogItem;
  //           });

  //         return items;          
  //   } else {
  //     Log.error("ProductCatalogService", new Error(response.statusText));
  //     return [];
  //   }
  // }
  //#endregion

  //#region Example using custom Entra ID protected API and AadHttpClient
  // public async getProducts(
  //   siteId: string,
  //   listName: string
  // ): Promise<IProductCatalogItem[]> {

  //     const response = await this._aadHttpClient.get("https://demospfxfunction.azurewebsites.net/api/GetProducts", AadHttpClient.configurations.v1);
      
  //     if (response.ok) {

  //         const responseJson = await response.json();
      
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         const items: IProductCatalogItem[] = responseJson.map((item: any) => {
  //           return {
  //             modelName: item.packtProductModelName,
  //             lastOrderDate: item.packtProductStockLastOrderDate
  //               ? new Date(item.packtProductStockLastOrderDate)
  //               : null,
  //             productReference: item.packtProductReference,
  //             stockLevel: item.packtProductStockLevel,
  //             size: item.packtProductSize as ProductSizes,
  //             retailPrice: item.packtProductRetailPrice,
  //             itemColour: item.packtProductColor,
  //             itemPicture: item.packtProductItemPicture
  //           } as IProductCatalogItem;
  //         });

  //         return items;          
  //   } else {
  //     Log.error("ProductCatalogService", new Error(response.statusText));
  //     return [];
  //   }
  // }
  //#endregion
}
