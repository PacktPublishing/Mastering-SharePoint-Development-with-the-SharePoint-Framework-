import { Log } from '@microsoft/sp-core-library';
import { BaseSearchQueryModifier, IQuery, SearchQueryScenario } from '@microsoft/sp-search-extensibility';

// import * as strings from 'PacktProductSearchQueryModifierSearchQueryModifierStrings';

/**
 * If your search query modifier uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPacktProductSearchQueryModifierSearchQueryModifierProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

const LOG_SOURCE: string = 'PacktProductSearchQueryModifierSearchQueryModifier';

export default class PacktProductSearchQueryModifierSearchQueryModifier extends BaseSearchQueryModifier<IPacktProductSearchQueryModifierSearchQueryModifierProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized PacktProductSearchQueryModifierSearchQueryModifier');
    return Promise.resolve();
  }

  public modifySearchQuery(query: IQuery, scenario: SearchQueryScenario): Promise<IQuery> {
    query.queryText = `startswith(fields/packtProductReference, '${query.queryText}')`;
    console.log(`Modified query: ${query.queryText}`);
    return Promise.resolve(query);
  }
}
