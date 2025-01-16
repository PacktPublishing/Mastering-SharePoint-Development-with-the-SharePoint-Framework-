import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { PacktProductAdaptiveCardExtensionPropertyPane } from './PacktProductAdaptiveCardExtensionPropertyPane';

export interface IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionProps {
  title: string;
}

export interface IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'PacktProductAdaptiveCardExtension_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'PacktProductAdaptiveCardExtension_QUICK_VIEW';

export default class PacktProductAdaptiveCardExtensionAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionProps,
  IPacktProductAdaptiveCardExtensionAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: PacktProductAdaptiveCardExtensionPropertyPane;

  public onInit(): Promise<void> {
    this.state = { };

    // registers the card view to be shown in a dashboard
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    // registers the quick view to open via QuickView action
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
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
