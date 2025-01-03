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

    //#region  Usage with MS Graph API
    const msGraphClient = await this.context.msGraphClientFactory.getClient("3");
    this._productCatalogService = new ProductCatalogService(msGraphClient);
    //#endregion

    //#region  Usage with SharePoint REST API
    //this._productCatalogService = new ProductCatalogService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl);
    //#endregion

    //#region  Usage with regular HTTP client
    //this._productCatalogService = new ProductCatalogService(this.context.httpClient);
    //#endregion

    //#region  Usage with AadHttpClient
    // In this example, the client ID of the Entra ID application is "4df79ed7-c568-499a-b1c2-6abdcab5d4bf"
    // const aadHttpClient = await this.context.aadHttpClientFactory.getClient("4df79ed7-c568-499a-b1c2-6abdcab5d4bf");
    // this._productCatalogService = new ProductCatalogService(aadHttpClient);
    //#endregion

    //#region  Usage of AadTokenProvider
    // const aadTokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();

    // aadTokenProvider.getToken("https://graph.microsoft.com").then((token) => {
    //   console.log(token);
    // });
    
    // aadTokenProvider.getToken("4df79ed7-c568-499a-b1c2-6abdcab5d4bf").then((token) => {
    //   console.log(token);
    // });
    //#endregion

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
