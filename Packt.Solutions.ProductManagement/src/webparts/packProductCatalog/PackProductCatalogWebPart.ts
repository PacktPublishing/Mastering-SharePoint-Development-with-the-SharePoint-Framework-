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
  productsListName: string;
}

export default class PackProductCatalogWebPart extends BaseClientSideWebPart<IPackProductCatalogWebPartProps> {

  private _productCatalogService: IProductCatalogService;

  public render(): void {
    const element: React.ReactElement<IPackProductCatalogProps> = React.createElement(
      PackProductCatalog,
      {
        productCatalogService: this._productCatalogService,
        siteId: this.context.pageContext.site.id.toString(),
        listName: this.properties.productsListName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    // Usage with MS Graph API
    /*const msGraphClient = await this.context.msGraphClientFactory.getClient("3");
    this._productCatalogService = new ProductCatalogService(msGraphClient);*/

    // Usage with SharePoint REST API
    this._productCatalogService = new ProductCatalogService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);

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
