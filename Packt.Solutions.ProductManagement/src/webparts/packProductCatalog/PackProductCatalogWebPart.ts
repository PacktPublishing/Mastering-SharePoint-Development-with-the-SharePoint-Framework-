import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Guid, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneField,
  PropertyPaneDynamicField,
  PropertyPaneHorizontalRule,
  PropertyPaneToggle,
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import PackProductCatalog from './components/PackProductCatalog';
import { IPackProductCatalogProps } from './components/IPackProductCatalogProps';
import { IProductCatalogService } from '../../services/IProductCatalogService';
import { ProductCatalogService } from '../../services/ProductCatalogService';
import { DynamicProperty, IReadonlyTheme } from '@microsoft/sp-component-base';
import { ITopActions, TopActionsFieldType } from '@microsoft/sp-top-actions';
import * as PackProductCatalogStrings from "PackProductCatalogWebPartStrings";
import * as strings from 'PackProductCatalogWebPartStrings';
import { PropertyPaneAsyncListPicker } from '../../controls/PropertyPaneAsyncListPicker/PropertyPaneAsyncListPicker';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { ISPFXContext, spfi, SPFx as spSPFx } from "@pnp/sp";
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';

export interface IPackProductCatalogWebPartProps {
  productsListName: string;
  itemsCount: number;
  useDynamicSearchQuery: boolean;
  searchQuery: DynamicProperty<string>;
  
  /*  Scenario when consuming multiple dynamic properties from a single source

  myProperty1: DynamicProperty<string>;
  myProperty2: DynamicProperty<string>;

  */
}

export default class PackProductCatalogWebPart extends BaseClientSideWebPart<IPackProductCatalogWebPartProps> {

  private _productCatalogService: IProductCatalogService;
  private _msGraphClient: MSGraphClientV3;
  private _runInTeams: boolean;

  public render(): void {
    const element: React.ReactElement<IPackProductCatalogProps> =
      React.createElement(PackProductCatalog, {
        productCatalogService: this._productCatalogService,
        siteId: this.context.pageContext.site.id.toString(),
        listName: this.properties.productsListName,
        itemsCount: this.properties.itemsCount,
        searchQuery: this.properties.searchQuery.tryGetValue()
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    this._msGraphClient = await this.context.msGraphClientFactory.getClient(
      "3"
    );

    const sp = spfi().using(spSPFx(this.context as ISPFXContext));
    
    this._productCatalogService = new ProductCatalogService(sp);

    this._runInTeams = await !!this.context.sdks.microsoftTeams?.teamsJs.app.getContext()
 
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
    return Version.parse(this.context.manifest.version);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata | undefined {
      return {
        'searchQuery': {
          dynamicPropertyType: 'string'
        },

        /* Scenario when consuming multiple dynamic properties from a single source

        'myProperty1': {
          dynamicPropertyType: 'string'
        },
        'myProperty2': {
          dynamicPropertyType: 'string'
        }
        */
      };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {

    if (propertyPath === 'useDynamicSearchQuery' && !newValue) {
        // Disconnect the source
        this.properties.searchQuery.setValue('');
        this.properties.searchQuery.unregister(this.render);
    }

    if (propertyPath === 'searchQuery') {
      this.properties.searchQuery.register(this.render);
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const groupFields: IPropertyPaneField<any>[] = [
      /* Property field coming from the @pnp/spfx-property-controls library */
      PropertyFieldSpinButton('itemsCount', {
        label: strings.PropertyPane.ItemsCountFieldLabel,
        initialValue: this.properties.itemsCount,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        disabled: false,
        min: 0,
        max: 5,
        step: 1,
        decimalPlaces: 0,
        incrementIconName: 'CalculatorAddition',
        decrementIconName: 'CalculatorSubtract',
        key: 'spinButtonFieldId'
      }),
      new PropertyPaneAsyncListPicker("productsListName", {
        msGraphClient: this._msGraphClient,
        siteId: this.context.pageContext.site.id.toString(),
        defaultListName: this.properties.productsListName
      }),
      PropertyPaneHorizontalRule(),
    ];

    // Display only option if not in a Teams context
    if (!this._runInTeams) {
      groupFields.push(
        PropertyPaneToggle("useDynamicSearchQuery", {
          checked: this.properties.useDynamicSearchQuery,
          label: strings.PropertyPane.UseDynamicSearchQueryFieldLabel
        })
      );
      
      if (this.properties.useDynamicSearchQuery) {
        groupFields.push(
          PropertyPaneDynamicField('searchQuery', {
            label: strings.PropertyPane.SearchQueryDynamicField,
            filters: {
              componentId: Guid.tryParse("c6609154-e547-4c70-957e-9ec482df52a1")
            }           
          }),
          /* Scenario when consuming multiple dynamic properties from a single source 
  
          PropertyPaneDynamicFieldSet({
            label: 'Select a property',
            fields: [
              PropertyPaneDynamicField('myProperty1', {
                label: "My property 1"      
              }),
              PropertyPaneDynamicField('myProperty2', {
                label: "My property 2"         
              }),
            ],
            sharedConfiguration: {
              depth: DynamicDataSharedDepth.Source,
              source: {
                sourcesLabel: "My source",
                filters: {
                  componentId: Guid.tryParse("c6609154-e547-4c70-957e-9ec482df52a1")
                }
              }
            }
          })*/
        );
      }
    }

    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.PropertyPane.SettingsGroupName,
              groupFields: groupFields
            }
            /* Scenario when using conditional groups to manage static/dynamic values
            {
              primaryGroup: {
                groupName: "Configure static group",
                groupFields: [
                  PropertyPaneTextField('searchQuery', {
                    label: strings.PropertyPane.SearchQueryDynamicField,
                  })
                ]
              },
              secondaryGroup: {
                groupName: "Configure dynamic value",
                groupFields: [
                  PropertyPaneDynamicField('searchQuery', {
                    label: strings.PropertyPane.SearchQueryDynamicField,
                    filters: {
                      componentId: Guid.tryParse("c6609154-e547-4c70-957e-9ec482df52a1")
                    }           
                  })
                ]
              },
              showSecondaryGroup: !!this.properties.searchQuery.tryGetSource()
            } as IPropertyPaneConditionalGroup
             */
        ]
        }
      ]
    };
  }
}
