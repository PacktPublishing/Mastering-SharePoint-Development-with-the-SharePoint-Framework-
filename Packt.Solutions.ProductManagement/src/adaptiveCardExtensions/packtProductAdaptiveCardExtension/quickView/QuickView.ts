import { ISPFxAdaptiveCard, BaseAdaptiveCardQuickView } from '@microsoft/sp-adaptive-card-extension-base';
import {
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionProps,
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionState,
  IProductStock
} from '../PacktProductAdaptiveCardExtensionAdaptiveCardExtension';

export interface IQuickViewData {
  productStocks: IProductStock[];
}

export class QuickView extends BaseAdaptiveCardQuickView<
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionProps,
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    const { productStocks } = this.state;
    return {
      productStocks
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
