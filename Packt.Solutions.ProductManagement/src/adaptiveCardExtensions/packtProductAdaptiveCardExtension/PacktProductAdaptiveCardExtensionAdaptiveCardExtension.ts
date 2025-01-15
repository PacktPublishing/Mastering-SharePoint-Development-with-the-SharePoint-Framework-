import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { PacktProductAdaptiveCardExtensionPropertyPane } from './PacktProductAdaptiveCardExtensionPropertyPane';
import { IProductCatalogService } from '../../services/IProductCatalogService';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { ProductCatalogService } from '../../services/ProductCatalogService';
import { groupBy } from '@microsoft/sp-lodash-subset';

export interface IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionProps {
  title: string;
  productsListName: string;
}

export interface IProductStock {
  color: string;
  stock: number;
}

export interface IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionState {
  productStocks: IProductStock[];
}

const CARD_VIEW_REGISTRY_ID: string = 'PacktProductAdaptiveCardExtension_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'PacktProductAdaptiveCardExtension_QUICK_VIEW';

export default class PacktProductAdaptiveCardExtensionAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionProps,
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: PacktProductAdaptiveCardExtensionPropertyPane;
  private _productCatalogService: IProductCatalogService;
  private _msGraphClient: MSGraphClientV3;

  public async onInit(): Promise<void> {
    this.state = {
      productStocks: []
    };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    this._msGraphClient = await this.context.msGraphClientFactory.getClient(
      "3"
    );

    this._productCatalogService = new ProductCatalogService(this._msGraphClient);

    await this.loadProductStocks();

    return Promise.resolve();
  }

  private async loadProductStocks(): Promise<void> {
    setTimeout(async () => {
      const products = await this._productCatalogService.getProducts(
        this.context.pageContext.site.id.toString(),
        this.properties.productsListName
      )

      const allProductStocks = products.map(product => {
        return {
          color: product.itemColour,
          stock: product.stockLevel
        };
      });

      // if the productStocks array has colors with the same name, then sum the stock levels use groupBy
      const groupedProductStocks = groupBy(allProductStocks, 'color');
      const productStocksResult: IProductStock[] = [];

      for (const color in groupedProductStocks) {
        const stock = groupedProductStocks[color].reduce((acc, productStock) => acc + productStock.stock, 0);
        productStocksResult.push({
          color: color,
          stock: stock
        });
      }

      this.setState({
        productStocks: productStocksResult
      });
    }, 300);

  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'PacktProductAdaptiveCardExtension-property-pane'*/
      './PacktProductAdaptiveCardExtensionPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.PacktProductAdaptiveCardExtensionPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
