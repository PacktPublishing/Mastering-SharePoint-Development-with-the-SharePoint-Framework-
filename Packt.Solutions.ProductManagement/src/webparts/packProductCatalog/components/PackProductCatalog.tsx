import * as React from "react";
import type { IPackProductCatalogProps } from "./IPackProductCatalogProps";
import {
  IProductCatalogItem,
} from "../../../models/IProductCatalogItem";
import { IPacktProductCatalogState } from "./IPacktProductCatalogState";
import styles from "./PackProductCatalog.module.scss";
import { ImageHelper } from "@microsoft/sp-image-helper";
import * as PackProductCatalogStrings from "PackProductCatalogWebPartStrings";

export default class PackProductCatalog extends React.Component<
  IPackProductCatalogProps,
  IPacktProductCatalogState
> {

  constructor(props: IPackProductCatalogProps) {
    super(props);
    this.state = {
      productItems: [],
    };
  }

  public render(): React.ReactElement<IPackProductCatalogProps> {
    return (
      <div className={styles.productList}>
        {this.state.productItems.map((productItem: IProductCatalogItem) => {
          return (
            <div
              className={styles.productItem}
              style={{
                backgroundImage: `url(${ImageHelper.convertToImageUrl({
                  sourceUrl: productItem.itemPicture,
                  width: 250,
                })})`,
              }}
              key={productItem.productReference}
            >
              <div className={styles.productItemFooter}>
                <div className={styles.tertiaryText}>
                  <span>
                    {PackProductCatalogStrings.Labels.Reference}: {productItem.productReference}
                  </span>
                </div>
                <div className={styles.primaryText}>
                  {productItem.modelName}
                </div>
                <div className={styles.secondaryText}>
                  <span>
                    {PackProductCatalogStrings.Labels.Size}: {productItem.size}
                  </span>
                  <span>
                    {PackProductCatalogStrings.Labels.StockLevel}:{" "}
                    {productItem.stockLevel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  public async componentDidMount(): Promise<void> {
    const productItems: IProductCatalogItem[] = await this.props.productCatalogService.getProducts(this.props.siteId, this.props.listName);

    this.setState({
      productItems: productItems,
    });
  }
}
