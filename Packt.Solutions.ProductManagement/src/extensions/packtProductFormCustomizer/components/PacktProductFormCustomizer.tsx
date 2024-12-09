import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { IPacktProductFormCustomizerProps } from './IPacktProductFormCustomizerProps';
// import styles from './PacktProductFormCustomizer.module.scss';
import { IPacktProductFormCustomizerState } from './IPacktProductFormCustomizerState';
import { IProductCatalogItem } from '../../../models/IProductCatalogItem';

const LOG_SOURCE: string = 'PacktProductFormCustomizer';

export default class PacktProductFormCustomizer extends React.Component<IPacktProductFormCustomizerProps, IPacktProductFormCustomizerState> {
  
  constructor(props: IPacktProductFormCustomizerProps) {
    super(props);
    this.state = {
      product: null,
      loading: true,
      error: null
    };
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
          this.props.onSave();
        })
        .catch((error: string) => {
          this.setState({
            error: error
          });
        });
    } else {
      this._updateProduct(this.state.product)
        .then(() => {
          this.props.onSave();
        })
        .catch((error: string) => {
          this.setState({
            error: error
          });
        });
    }
  }

  
  public componentDidMount(): void {
    if (this.props.displayMode === FormDisplayMode.New) {
      return;
    }

    // load item to display on the form
    this.props.productCatalogService.getProductById(this.props.siteId, this.props.listName, this.props.itemId)
      .then((product) => {
        this.setState({
          product: product,
          loading: false
        });
      })
      .catch((error: string) => {
        this.setState({
          error: error,
          loading: false
        });
      });
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: PacktProductFormCustomizer unmounted');
  }

  public render(): React.ReactElement<{}> {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    }

    if (this.state.product === null) {
      return <div>Product not found</div>;
    }

    if (this.props.displayMode === FormDisplayMode.Display) {
      return (
        <div>
          <h1>{this.state.product.modelName}</h1>
          <div>
            <img src={this.state.product.itemPicture} alt={this.state.product.modelName} />
          </div>
          <div>
            <strong>Reference:</strong> {this.state.product.productReference}
          </div>
          <div>
            <strong>Size:</strong> {this.state.product.size}
          </div>
          <div>
            <strong>Stock Level:</strong> {this.state.product.stockLevel}
          </div>
          <div>
            <button onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      );
    }

    // todo: if edit or new mode then capture the data using input for product properties and have buttons to save and close

    return <></>;
  }
}
