import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PacktProductSearchBox from './components/PacktProductSearchBox';
import { IPacktProductSearchBoxProps } from './components/IPacktProductSearchBoxProps';
import {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables
} from '@microsoft/sp-dynamic-data';
import * as strings from 'PacktProductSearchBoxWebPartStrings';

export interface IPacktProductSearchBoxWebPartProps {
}

export default class PacktProductSearchBoxWebPart extends BaseClientSideWebPart<IPacktProductSearchBoxWebPartProps> implements IDynamicDataCallables {

  private _searchQuery: string = '';

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      { id: 'queryText', title: strings.SearchQueryPropertyDefinition, description: strings.SearchQueryPropertyDefinitionDescription }

      /* Scenario when consuming multiple dynamic properties from a single source

      { id: 'myProperty1', title:"myProperty1", description: strings.SearchQueryPropertyDefinitionDescription },
      { id: 'myProperty2', title:"myProperty2", description: strings.SearchQueryPropertyDefinitionDescription }

       */
    ];
  }

  public getPropertyValue(propertyId: string): string {

    /* Scenario when consuming multiple dynamic properties from a single source

    switch (propertyId) {

      case 'myProperty1':
        return  "myProperty1";        
    
      case 'myProperty2':
        return  "myProperty2";  
      
      default:
        return '';
    }
    */
    
    return this._searchQuery;
  }


  public render(): void {
    const element: React.ReactElement<IPacktProductSearchBoxProps> = React.createElement(
      PacktProductSearchBox,
      {
        onSearch: (searchText: string) => {
          this._searchQuery = searchText;
          this.context.dynamicDataSourceManager.notifyPropertyChanged('queryText');
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {

    this.context.dynamicDataSourceManager.initializeSource(this);

    return Promise.resolve();
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
