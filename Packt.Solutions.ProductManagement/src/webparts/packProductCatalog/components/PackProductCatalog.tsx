import * as React from "react";
import type { IPackProductCatalogProps } from "./IPackProductCatalogProps";
import {
  IProductCatalogItem,
} from "../../../models/IProductCatalogItem";
import { IPacktProductCatalogState } from "./IPacktProductCatalogState";
import { GridLayout } from "@pnp/spfx-controls-react/lib/GridLayout";
import { ISize } from "@fluentui/react/lib/Utilities";
import { IDocumentCardPreviewProps, ImageFit, DocumentCard, DocumentCardType, DocumentCardPreview, DocumentCardLocation, DocumentCardDetails, DocumentCardTitle } from "@fluentui/react";

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
  
  private _onRenderGridItem = (item: IProductCatalogItem, finalSize: ISize, isCompact: boolean): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.itemPicture,
          imageFit: ImageFit.cover,
          height: 130
        }
      ]
    };

    return <div
      data-is-focusable={true}
      role="listitem"
      aria-label={item.modelName}
    >
      <DocumentCard
        type={isCompact ? DocumentCardType.compact : DocumentCardType.normal}
      >
        <DocumentCardPreview {...previewProps} />
        {!isCompact && <DocumentCardLocation location={item.productReference} />}
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.modelName}
            shouldTruncate={true}
          />
        </DocumentCardDetails>
      </DocumentCard>
    </div>;
  }

  public render(): React.ReactElement<IPackProductCatalogProps> {

    return  <GridLayout
              ariaLabel="List of content, use right and left arrow keys to navigate, arrow down to access details."
              items={this.state.productItems}
              onRenderGridItem={(item: any, finalSize: ISize, isCompact: boolean) => this._onRenderGridItem(item, finalSize, isCompact)}
            />
  }
  
  public async componentDidMount(): Promise<void> {
    await this.getItems();
  }

  public async componentDidUpdate(prevProps: Readonly<IPackProductCatalogProps>): Promise<void> {

    if (prevProps.itemsCount !== this.props.itemsCount || 
        prevProps.listName !== this.props.listName ||
        prevProps.searchQuery !== this.props.searchQuery) {
      await this.getItems();
    }
  }

  private async getItems(): Promise<void> {
    const productItems: IProductCatalogItem[] = await this.props.productCatalogService.getProducts(this.props.listName, this.props.itemsCount);

    this.setState({
      productItems: productItems,
    });
  }
}
