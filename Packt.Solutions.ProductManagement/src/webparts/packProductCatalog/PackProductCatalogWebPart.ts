import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PackProductCatalog from './components/PackProductCatalog';
import { IPackProductCatalogProps } from './components/IPackProductCatalogProps';
import { IProductCatalogService } from '../../services/IProductCatalogService';
import { ProductCatalogService } from '../../services/ProductCatalogService';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ITopActions, TopActionsFieldType } from '@microsoft/sp-top-actions';
import * as PackProductCatalogStrings from "PackProductCatalogWebPartStrings";

export interface IPackProductCatalogWebPartProps {
  productsListName: string;
  itemsCount: number;
}

export default class PackProductCatalogWebPart extends BaseClientSideWebPart<IPackProductCatalogWebPartProps> {

  private _productCatalogService: IProductCatalogService;

  public render(): void {
    const element: React.ReactElement<IPackProductCatalogProps> =
      React.createElement(PackProductCatalog, {
        productCatalogService: this._productCatalogService,
        siteId: this.context.pageContext.site.id.toString(),
        listName: this.properties.productsListName,
        itemsCount: this.properties.itemsCount
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    const msGraphClient = await this.context.msGraphClientFactory.getClient(
      "3"
    );
    this._productCatalogService = new ProductCatalogService(msGraphClient);
 
    return super.onInit();
  }

  public getTopActionsConfiguration(): ITopActions | undefined {

    return {
      topActions: [
        {
          targetProperty: 'selectCount',
          type: TopActionsFieldType.Dropdown,
          title: 'Dropdown',
          properties: {
            options: [
            {
              key: 1,
              text: PackProductCatalogStrings.TopActions.OneTile,
              checked: this.properties.itemsCount === 1
            }, 
            {
              key: 2,
              text:  PackProductCatalogStrings.TopActions.TwoTiles,
              checked: this.properties.itemsCount === 2
            },
                        {
              key: 3,
              text:  PackProductCatalogStrings.TopActions.ThreeTiles,
              checked: this.properties.itemsCount === 3
            }
          ]
          }
        }
      ],
      onExecute: (actionName: string, newValue: number): void => {

        if (actionName === 'selectCount') {
          this.properties.itemsCount = newValue;
          this.render();
        }
      }
    }
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {

    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty("--productTileBackground", semanticColors.bodyBackground || null);
      this.domElement.style.setProperty("--productTileText", semanticColors.bodyText || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [],
    };
  }
}
