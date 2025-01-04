import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';

import styles from './PacktProductFormCustomizer.module.scss';
import { IPacktProductFormCustomizerState } from './IPacktProductFormCustomizerState';
import { ProductSizes } from '../../../models/IProductCatalogItem';

import { TextField } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';


export interface IPacktProductFormCustomizerProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'PacktProductFormCustomizer';

export default class PacktProductFormCustomizer extends React.Component<IPacktProductFormCustomizerProps, IPacktProductFormCustomizerState> {

  constructor(props: IPacktProductFormCustomizerProps) {
    super(props);
    this.state = {
      product: null,
      error: null
    };
  }

  // Define the size options with the "shirt" icon
  private _sizeOptions: IChoiceGroupOption[] = [
    { key: ProductSizes[ProductSizes.XS], text: 'XS', iconProps: { iconName: 'shirt', style: { fontSize: '10px' } } },
    { key: ProductSizes[ProductSizes.S], text: 'S', iconProps: { iconName: 'shirt', style: { fontSize: '12px' } } },
    { key: ProductSizes[ProductSizes.M], text: 'M', iconProps: { iconName: 'shirt', style: { fontSize: '14px' } } },
    { key: ProductSizes[ProductSizes.L], text: 'L', iconProps: { iconName: 'shirt', style: { fontSize: '16px' } } },
    { key: ProductSizes[ProductSizes.XL], text: 'XL', iconProps: { iconName: 'shirt', style: { fontSize: '18px' } } },
    { key: ProductSizes[ProductSizes.XXL], text: 'XXL', iconProps: { iconName: 'shirt', style: { fontSize: '20px' } } }
  ];

  private _colourOptions: string[] = ['Red', 'Blue', 'Green', 'Black', 'White'];

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

    // if we are in edit mode or display mode, we load static data
    this.setState({
      product: {
        modelName: 'Packt Product',
        retailPrice: 100,
        stockLevel: 10,
        lastOrderDate: new Date(),
        itemPicture: '',
        itemColour: 'Red',
        size: ProductSizes.M,
        productReference: 'ABC123'
      }
    });
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: PacktProductFormCustomizer unmounted');
  }

  public render(): React.ReactElement<{}> {
    if (this.props.displayMode === FormDisplayMode.Display) {
      return (
        <div className={styles.packtProductFormCustomizer}>
          <Label>Model Name: {this.state.product?.modelName}</Label>
          <Label>Retail Price: {this.state.product?.retailPrice}</Label>
          <Label>Stock Level: {this.state.product?.stockLevel}</Label>
          <Label>Last Order Date: {this.state.product?.lastOrderDate?.toDateString()}</Label>
          <Label>Item Picture: {this.state.product?.itemPicture}</Label>
          <Label>Item Colour: {this.state.product?.itemColour}</Label>
          <Label>Size: {this.state.product?.size}</Label>
          <Label>Product Reference: {this.state.product?.productReference}</Label>
        </div>
      );
    }

    return (
      <div className={styles.packtProductFormCustomizer}>
        <TextField label="Model Name" value={this.state.product?.modelName} onChange={this._onModelNameChange.bind(this)} />
        <TextField label="Retail Price" value={this.state.product?.retailPrice.toString()} onChange={this._onRetailPriceChange.bind(this)} />
        <TextField label="Stock Level" value={this.state.product?.stockLevel.toString()} onChange={this._onStockLevelChange.bind(this)} />
        <TextField label="Item Picture" value={this.state.product?.itemPicture} onChange={this._onItemPictureChange.bind(this)} />
        <div>
          <Label>Item Colour</Label>
          <div className={styles.productColourContainer}>
            {this._colourOptions.map(colour => (
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
        <ChoiceGroup
          label="Size"
          selectedKey={this.state.product?.size}
          options={this._sizeOptions}
          onChange={this._onSizeChange.bind(this)}
        />
        <TextField label="Product Reference" value={this.state.product?.productReference} onChange={this._onProductReferenceChange.bind(this)} />
        <TextField label="Last Order Date" value={this.state.product?.lastOrderDate?.toDateString()} onChange={this._onLastOrderDateChange.bind(this)} />
        <PrimaryButton text="Save" />
        <DefaultButton text="Cancel" />
      </div>
    );

    return <></>;
  }
}
