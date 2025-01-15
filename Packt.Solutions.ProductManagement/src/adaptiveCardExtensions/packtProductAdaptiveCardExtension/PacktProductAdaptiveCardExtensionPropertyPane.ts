import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'PacktProductAdaptiveCardExtensionAdaptiveCardExtensionStrings';

export class PacktProductAdaptiveCardExtensionPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('productsListName', {
                  label: "Products List Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
