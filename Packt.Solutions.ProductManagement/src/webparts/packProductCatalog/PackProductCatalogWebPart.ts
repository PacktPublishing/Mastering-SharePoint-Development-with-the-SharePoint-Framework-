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

export interface IPackProductCatalogWebPartProps {
}

export default class PackProductCatalogWebPart extends BaseClientSideWebPart<IPackProductCatalogWebPartProps> {

  private _productCatalogService: IProductCatalogService;


  public render(): void {
    const element: React.ReactElement<IPackProductCatalogProps> = React.createElement(
      PackProductCatalog,
      {
        productCatalogService: this._productCatalogService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._productCatalogService = new ProductCatalogService();
    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
