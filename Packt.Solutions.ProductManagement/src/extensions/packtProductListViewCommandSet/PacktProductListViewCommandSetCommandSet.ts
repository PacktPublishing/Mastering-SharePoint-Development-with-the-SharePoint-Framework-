import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  type Command,
  type IListViewCommandSetExecuteEventParameters,
  type ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { IHttpService } from '../../services/IHttpService';
import HttpService from '../../services/HttpService';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPacktProductListViewCommandSetCommandSetProperties {
  // This is an example; replace with your own properties
  lowStockThreshold: number;
  stockUpdatedMessage: string;
}

const LOG_SOURCE: string = 'PacktProductListViewCommandSetCommandSet';

export default class PacktProductListViewCommandSetCommandSet extends BaseListViewCommandSet<IPacktProductListViewCommandSetCommandSetProperties> {

  private _httpService: IHttpService;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized PacktProductListViewCommandSetCommandSet');

    // Initialize the HttpService
    this._httpService = new HttpService(this.context.httpClient);

    // initial state of the command's visibility
    const updateStockCommand: Command = this.tryGetCommand('UPDATE_STOCK_COMMAND');
    updateStockCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'UPDATE_STOCK_COMMAND':
        const selectedRows = this.context.listView.selectedRows;

        if (!selectedRows || selectedRows.length !== 1) {
          Dialog.alert('Please select one item to update the stock level');
          return;
        }

        const selectedRow = selectedRows[0];
        const productId = selectedRow.getValueByName('ID');
        const productStockLevel = selectedRow.getValueByName('packtProductStockLevel');

        // Update the stock level of the selected product
        const powerAutomateUrl = "https://prod-00.westus.logic.azure.com/workflows/your-flow-id/triggers/manual/paths/invoke";
        const powerAutomatePayload = {
          id: productId,
          stockLevel: productStockLevel
        };

        this._httpService.post(powerAutomateUrl, powerAutomatePayload)
          .then(() => {
            Dialog.alert(`${this.properties.stockUpdatedMessage}`);
          })
          .catch((error) => {
            Dialog.alert(`Error updating stock level: ${error}`);
          });

        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const updateStockCommand: Command = this.tryGetCommand('UPDATE_STOCK_COMMAND');
    if (updateStockCommand) {

      const selectedRows = this.context.listView.selectedRows;

      // Ensure exactly one item is selected
      if (selectedRows?.length === 1) {
        const stockLevel = selectedRows[0].getValueByName('packtProductStockLevel');

        const lowStockThreshold = this.properties.lowStockThreshold || 10;

        // Show the command only if stockLevel is less than lowStockThreshold
        if (stockLevel !== undefined && stockLevel < lowStockThreshold) {
          updateStockCommand.visible = true;
        } else {
          updateStockCommand.visible = false;
        }
      } else {
        updateStockCommand.visible = false;
      }

    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
