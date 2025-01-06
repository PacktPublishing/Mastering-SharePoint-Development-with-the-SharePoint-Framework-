import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { IPacktProductFormCustomizerProps } from './IPacktProductFormCustomizerProps';
// import styles from './PacktProductFormCustomizer.module.scss';
import { IPacktProductFormCustomizerState } from './IPacktProductFormCustomizerState';
import { IProductCatalogItem, ProductSizes } from '../../../models/IProductCatalogItem';

import { TextField } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
// import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';


const LOG_SOURCE: string = 'PacktProductFormCustomizer';

export default class PacktProductFormCustomizer extends React.Component<IPacktProductFormCustomizerProps, IPacktProductFormCustomizerState> {

  constructor(props: IPacktProductFormCustomizerProps) {
    super(props);
    this.state = {
      product: null,
      error: null
    };
  }

  private _onModelNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.modelName = newValue || '';
    this.setState({
      product: product
    });
  }

  private _onRetailPriceChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.retailPrice = parseFloat(newValue || '0');
    this.setState({
      product: product
    });
  }

  private _onStockLevelChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.stockLevel = parseInt(newValue || '0');
    this.setState({
      product: product
    });
  }

  // covert text to date
  private _onLastOrderDateChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.lastOrderDate = new Date(newValue || '');
    this.setState({
      product: product
    });
  }

  private _onItemPictureChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.itemPicture = newValue || '';
    this.setState({
      product: product
    });
  }

  // dropdown
  /* private _onItemColourChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.itemColour = option ? option.key as string : '';
    this.setState({
      product: product
    });
  } */

  private _onItemColourChange = (colour: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.itemColour = colour;
    this.setState({
      product: product
    });
  }

  /* private _onSizeChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.size = option ? option.key as ProductSizes : ProductSizes.M;
    this.setState({
      product: product
    });
  } */

  private _onSizeChange = (event: React.FormEvent<HTMLDivElement>, option?: IChoiceGroupOption, index?: number): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.size = option ? ProductSizes[option.key as keyof typeof ProductSizes] : ProductSizes.M;
    this.setState({
      product: product
    });
  }

  private _onProductReferenceChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const product = this.state.product;
    if (product === null) {
      return;
    }
    product.productReference = newValue || '';
    this.setState({
      product: product
    });
  }

  private _createProduct = (product: IProductCatalogItem): Promise<void> => {
    return this.props.productCatalogService.createProduct(this.props.siteId, this.props.listName, product)
  }

  private _updateProduct = (product: IProductCatalogItem): Promise<void> => {
    return this.props.productCatalogService.updateProduct(this.props.siteId, this.props.listName, product.productReference, product)
  }

  private _onSave = (): void => {
    if (this.state.product === null) {
      return;
    }

    if (this.props.displayMode === FormDisplayMode.New) {
      this._createProduct(this.state.product)
        .then(() => {
          if (!DEBUG) {
            this.props.onSave();
          } else {
            alert("Product created successfully");
          }
        })
        .catch((error: string) => {
          this.setState({
            error: error
          });
        });
    } else {
      this._updateProduct(this.state.product)
        .then(() => {
          if (!DEBUG) {
            this.props.onSave();
          } else {
            alert("Product updated successfully");
          }
        })
        .catch((error: string) => {
          this.setState({
            error: error
          });
        });
    }
  }

  // Define the size options with the "shirt" icon
  private sizeOptions: IChoiceGroupOption[] = [
    { key: ProductSizes[ProductSizes.XS], text: 'XS', iconProps: { iconName: 'shirt', style: { fontSize: '10px' } } },
    { key: ProductSizes[ProductSizes.S], text: 'S', iconProps: { iconName: 'shirt', style: { fontSize: '12px' } } },
    { key: ProductSizes[ProductSizes.M], text: 'M', iconProps: { iconName: 'shirt', style: { fontSize: '14px' } } },
    { key: ProductSizes[ProductSizes.L], text: 'L', iconProps: { iconName: 'shirt', style: { fontSize: '16px' } } },
    { key: ProductSizes[ProductSizes.XL], text: 'XL', iconProps: { iconName: 'shirt', style: { fontSize: '18px' } } },
    { key: ProductSizes[ProductSizes.XXL], text: 'XXL', iconProps: { iconName: 'shirt', style: { fontSize: '20px' } } }
  ];


  public componentDidMount(): void {
    if (this.props.displayMode === FormDisplayMode.New) {
      this.setState({
        product: {
          modelName: '',
          retailPrice: 0,
          stockLevel: 0,
          lastOrderDate: new Date(),
          itemPicture: '',
          itemColour: '',
          size: ProductSizes.M,
          productReference: ''
        }
      });
      return;
    }

    // load item to display on the form
    this.props.productCatalogService.getProductById(this.props.siteId, this.props.listName, this.props.itemId)
      .then((product) => {
        this.setState({
          product: product
        });
      })
      .catch((error: string) => {
        this.setState({
          error: error
        });
      });
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: PacktProductFormCustomizer unmounted');
  }

  public render(): React.ReactElement<{}> {

    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }

    // if the mode is Display, show item details in read-only mode
    if (this.props.displayMode === FormDisplayMode.Display) {
      return (
        <div>
          <Label>Model Name: {this.state.product?.modelName}</Label>
          <Label>Retail Price: {this.state.product?.retailPrice}</Label>
          <Label>Stock Level: {this.state.product?.stockLevel}</Label>
          <Label>Last Order Date: {this.state.product?.lastOrderDate}</Label>
          <Label>Item Picture: {this.state.product?.itemPicture}</Label>
          <Label>Item Colour: {this.state.product?.itemColour}</Label>
          <Label>Size: {this.state.product?.size}</Label>
          <Label>Product Reference: {this.state.product?.productReference}</Label>
        </div>
      );
    }

    // if the mode is New or Edit, show item details in edit mode with save and cancel buttons
    return (
      <div>
        <TextField label="Model Name" value={this.state.product?.modelName} onChange={this._onModelNameChange.bind(this)} />
        <TextField label="Retail Price" value={this.state.product?.retailPrice.toString()} onChange={this._onRetailPriceChange.bind(this)} />
        <TextField label="Stock Level" value={this.state.product?.stockLevel.toString()} onChange={this._onStockLevelChange.bind(this)} />
        <TextField label="Item Picture" value={this.state.product?.itemPicture} onChange={this._onItemPictureChange.bind(this)} />
        {/* <Dropdown label="Item Colour" selectedKey={this.state.product?.itemColour} options={[
          { key: 'Red', text: 'Red' },
          { key: 'Blue', text: 'Blue' },
          { key: 'Green', text: 'Green' },
          { key: 'Yellow', text: 'Yellow' }
        ]} onChange={this._onItemColourChange.bind(this)} /> */}
        <div>
          <label>Item Colour</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Red', 'Blue', 'Green', 'Black', 'White'].map(colour => (
              <div
                key={colour}
                onClick={() => this._onItemColourChange(colour)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: colour.toLowerCase(),
                  border: this.state.product?.itemColour === colour ? '2px solid black' : '1px solid gray',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
        {/* <Dropdown label="Size" selectedKey={this.state.product?.size} options={[
          { key: ProductSizes.XS, text: 'XS' },
          { key: ProductSizes.S, text: 'S' },
          { key: ProductSizes.M, text: 'M' },
          { key: ProductSizes.L, text: 'L' },
          { key: ProductSizes.XL, text: 'XL' },
          { key: ProductSizes.XXL, text: 'XXL' }
        ]} onChange={this._onSizeChange.bind(this)} /> */}
        <ChoiceGroup
          label="Size"
          selectedKey={this.state.product?.size}
          options={this.sizeOptions}
          onChange={this._onSizeChange.bind(this)}
        />
        <TextField label="Product Reference" value={this.state.product?.productReference} onChange={this._onProductReferenceChange.bind(this)} />
        <TextField label="Last Order Date" value={this.state.product?.lastOrderDate?.toDateString()} onChange={this._onLastOrderDateChange.bind(this)} />
        <PrimaryButton text="Save" onClick={this._onSave.bind(this)} />
        <DefaultButton text="Cancel" onClick={this.props.onClose} />
      </div>
    );

    return <></>;
  }
}
