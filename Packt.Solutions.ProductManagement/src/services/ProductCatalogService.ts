import { IProductCatalogItem, ProductSizes } from "../models/IProductCatalogItem";
import { IProductCatalogService } from "./IProductCatalogService";

export class ProductCatalogService implements IProductCatalogService {

    public async getProducts(): Promise<IProductCatalogItem[]> {

        const productItems: IProductCatalogItem[] = [
          {
            modelName: "UltraBoost Running Shoes",
            retailPrice: 180,
            stockLevel: 25,
            lastOrderDate: new Date("2023-04-01"),
            itemPicture: "ultraboost.jpg",
            itemColour: "Black",
            size: ProductSizes.M,
            productReference: "UB-001",
          },
          {
            modelName: "Tech Fleece Hoodie",
            retailPrice: 100,
            stockLevel: 40,
            lastOrderDate: new Date("2023-03-28"),
            itemPicture: "techfleece.jpg",
            itemColour: "Grey",
            size: ProductSizes.L,
            productReference: "TF-002",
          },
          {
            modelName: "Water Bottle",
            retailPrice: 25,
            stockLevel: 100,
            lastOrderDate: new Date("2023-03-15"),
            itemPicture: "waterbottle.jpg",
            itemColour: "Blue",
            size: ProductSizes.S,
            productReference: "WB-003",
          }
        ];

        return productItems
    }
}