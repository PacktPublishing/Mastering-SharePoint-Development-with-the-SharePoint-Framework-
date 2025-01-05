import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import PacktProductFormCustomizer, { IPacktProductFormCustomizerProps } from './components/PacktProductFormCustomizer';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IProductCatalogService } from '../../services/IProductCatalogService';
import { ProductCatalogService } from '../../services/ProductCatalogService';

/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPacktProductFormCustomizerFormCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'PacktProductFormCustomizerFormCustomizer';

export default class PacktProductFormCustomizerFormCustomizer
  extends BaseFormCustomizer<IPacktProductFormCustomizerFormCustomizerProperties> {

  private _productCatalogService: IProductCatalogService;
  private _msGraphClient: MSGraphClientV3;

  public async onInit(): Promise<void> {
    // Add your custom initialization to this method. The framework will wait
    // for the returned promise to resolve before rendering the form.
    Log.info(LOG_SOURCE, 'Activated PacktProductFormCustomizerFormCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

    this._msGraphClient = await this.context.msGraphClientFactory.getClient(
      "3"
    );

    this._productCatalogService = new ProductCatalogService(this._msGraphClient);

    return Promise.resolve();
  }

  public render(): void {
    // Use this method to perform your custom rendering.

    const packtProductFormCustomizer: React.ReactElement<{}> =
      React.createElement(PacktProductFormCustomizer, {
        productCatalogService: this._productCatalogService,
        siteId: this.context.pageContext.site.id.toString(),
        listName: this.context.list.title,
        itemId: this.context.itemId ? this.context.itemId.toString() : null,
        displayMode: this.displayMode,
        onSave: this._onSave,
        onClose: this._onClose
      } as IPacktProductFormCustomizerProps);

    ReactDOM.render(packtProductFormCustomizer, this.domElement);
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    ReactDOM.unmountComponentAtNode(this.domElement);
    super.onDispose();
  }

  private _onSave = (): void => {

    // You MUST call this.formSaved() after you save the form.
    this.formSaved();
  }

  private _onClose = (): void => {
    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  }
}
