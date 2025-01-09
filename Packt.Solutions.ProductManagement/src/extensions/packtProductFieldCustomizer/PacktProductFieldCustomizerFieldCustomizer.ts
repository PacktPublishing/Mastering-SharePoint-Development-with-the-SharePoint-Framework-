import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  type IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'PacktProductFieldCustomizerFieldCustomizerStrings';
import styles from './PacktProductFieldCustomizerFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPacktProductFieldCustomizerFieldCustomizerProperties {
  lowStockThreshold: number;
}

const LOG_SOURCE: string = 'PacktProductFieldCustomizerFieldCustomizer';

export default class PacktProductFieldCustomizerFieldCustomizer
  extends BaseFieldCustomizer<IPacktProductFieldCustomizerFieldCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated PacktProductFieldCustomizerFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "PacktProductFieldCustomizerFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    event.domElement.classList.add(styles.packtProductFieldCustomizer);
    const text: string = `${event.fieldValue}`;
    let value: number = parseInt(event.fieldValue);
    const lowStockThreshold: number = this.properties.lowStockThreshold || 10;
    if (value < lowStockThreshold) {
      event.domElement.innerHTML = `
        <div class='${styles.lowStockContentContainer}'>
          <div class='${styles.lowStockValue}'>${text}</div> 
          <div class='${styles.lowStockWarningIcon}'>&#9888;</div>
        </div>`;
      return;
    }
    event.domElement.innerText = text;
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
