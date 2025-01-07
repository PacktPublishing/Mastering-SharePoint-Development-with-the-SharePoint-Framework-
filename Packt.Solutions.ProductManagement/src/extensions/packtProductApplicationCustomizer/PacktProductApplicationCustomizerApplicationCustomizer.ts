import * as React from "react";
import * as ReactDOM from "react-dom";
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'PacktProductApplicationCustomizerApplicationCustomizerStrings';

import { ILowStockInformerProps } from "./components/ILowStockInformerProps";
import LowStockInformer from "./components/LowStockInformer";

const LOG_SOURCE: string = 'PacktProductApplicationCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPacktProductApplicationCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PacktProductApplicationCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<IPacktProductApplicationCustomizerApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    if (!this._topPlaceholder) {
      console.error("The expected placeholder (Top) was not found.");
      return;
    }

    if (this._topPlaceholder.domElement) {
      const lowStockInformer: React.ReactElement<ILowStockInformerProps> = React.createElement(
        LowStockInformer,
        {}
      );
      ReactDOM.render(lowStockInformer, this._topPlaceholder.domElement);
    }
  }

  private _onDispose(): void {
    console.log('[PacktProductApplicationCustomizerApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }

}
