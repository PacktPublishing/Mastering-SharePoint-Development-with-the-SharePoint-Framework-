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
    listName: string,
    itemsCount?: number,
    searchQuery?: string
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
        .filter(searchQuery ? `startswith(fields/packtProductModelName, '${searchQuery}') or startswith(fields/packtProductColor, '${searchQuery}') or startswith(fields/packtProductSize, '${searchQuery}')`:'')
        .expand(`fields($select=${fields})`)
        .top(itemsCount ? itemsCount : 50)
        .header("Prefer", "HonorNonIndexedQueriesWarningMayFailRandomly")
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
  
  // get product by id
  public async getProductById(
    siteId: string,
    listName: string,
    productId: string
  ): Promise<IProductCatalogItem | null> {
    try {
      const response = await this._msGraphClient
        .api(`sites/${siteId}/lists/${listName}/items/${productId}`)
        .get();

      return {
        modelName: response.fields.packtProductModelName,
        lastOrderDate: response.fields.packtProductStockLastOrderDate
          ? new Date(response.fields.packtProductStockLastOrderDate)
          : null,
        productReference: response.fields.packtProductReference,
        stockLevel: response.fields.packtProductStockLevel,
        size: response.fields.packtProductSize as ProductSizes,
        retailPrice: response.fields.packtProductRetailPrice,
        itemColour: response.fields.packtProductColor,
        itemPicture: response.fields.packtProductItemPicture
          ? JSON.parse(response.fields.packtProductItemPicture).serverRelativeUrl
          : null,
      } as IProductCatalogItem;

    } catch (error) {
      Log.error("ProductCatalogService", error);
      return null;
    }
  }

  // update product
  public async updateProduct(
    siteId: string,
    listName: string,
    productId: string,
    product: IProductCatalogItem
  ): Promise<void> {
    try {
      await this._msGraphClient
        .api(`sites/${siteId}/lists/${listName}/items/${productId}`)
        .patch({
          packtProductModelName: product.modelName,
          packtProductStockLastOrderDate: product.lastOrderDate,
          packtProductReference: product.productReference,
          packtProductStockLevel: product.stockLevel,
          packtProductSize: product.size,
          packtProductRetailPrice: product.retailPrice,
          packtProductColor: product.itemColour,
          packtProductItemPicture: product.itemPicture
            ? JSON.stringify({ serverRelativeUrl: product.itemPicture })
            : null,
        });

    } catch (error) {
      Log.error("ProductCatalogService", error);
    }
  }

  // create product
  public async createProduct(
    siteId: string,
    listName: string,
    product: IProductCatalogItem
  ): Promise<void> {
    try {
      await this._msGraphClient
        .api(`sites/${siteId}/lists/${listName}/items`)
        .post({
          "fields": {
            "packtProductModelName": product.modelName,
            "packtProductStockLastOrderDate": product.lastOrderDate,
            "packtProductReference": product.productReference,
            "packtProductStockLevel": product.stockLevel,
            "packtProductSize": ProductSizes[product.size],
            "packtProductRetailPrice": product.retailPrice,
            "packtProductColor": product.itemColour,
            "packtProductItemPicture": product.itemPicture
              ? JSON.stringify({ serverRelativeUrl: product.itemPicture })
              : null,
          }
        });

    } catch (error) {
      Log.error("ProductCatalogService", error);
    }
  }
}
