import * as React from "react";
import type { IPackProductCatalogProps } from "./IPackProductCatalogProps";
import {
  IProductCatalogItem,
} from "../../../models/IProductCatalogItem";
import { IPacktProductCatalogState } from "./IPacktProductCatalogState";

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
      <>
        {this.state.productItems.map((productItem: IProductCatalogItem) => {
          return (
              <div key={productItem.productReference}>{productItem.modelName}</div>
          );
        })}
      </>
    );
  }
  
  public async componentDidMount(): Promise<void> {
    const productItems: IProductCatalogItem[] = await this.props.productCatalogService.getProducts();

    this.setState({
      productItems: productItems,
    });
  }
}
