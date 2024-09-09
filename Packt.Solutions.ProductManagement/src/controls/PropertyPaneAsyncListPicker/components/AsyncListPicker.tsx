import * as React from "react";
import { IListService } from "../../../services/IListService";
import { ListService } from "../../../services/ListService";
import { IList } from "../../../models/IList";
import { ComboBox, IComboBox, IComboBoxOption, Spinner, SpinnerSize } from "@fluentui/react";
import { IPropertyPaneAsyncListPickerProps } from "../IPropertyPaneAsyncListPickerProps";
import * as strings from 'PackProductCatalogWebPartStrings';
import styles from "./AsyncListPicker.module.scss";

export interface IAsyncListPickerProps extends IPropertyPaneAsyncListPickerProps {
    onItemSelected: (item: IComboBoxOption) => void;
}

export interface IAsyncListPickerState {
    isLoading: boolean;
    isFetched: boolean;
    listOptions: IComboBoxOption[];
} 

export default class AsyncListPicker extends React.Component<IAsyncListPickerProps, IAsyncListPickerState> {

    private _listService: IListService;

    public constructor(props: IAsyncListPickerProps) {
        super(props);
        this.state = {
            isLoading: true,
            isFetched: false,
            listOptions: []
        };

        this._listService = new ListService(props.msGraphClient);
    }

    private async fetchLists(): Promise<void> {

        this.setState({
            isLoading: true
        });

        // Load the lists
        const lists = await this._listService.getLists(this.props.siteId)

        // Convert to options
        const listOptions: IComboBoxOption[] = lists.map((list: IList) => {
            return {
                key: list.id,
                text: list.title
            };
        });

        this.setState({
            listOptions: listOptions,
            isLoading: false,
            isFetched: true
        });
    }

    public render(): React.ReactElement<IAsyncListPickerProps> {


        return  <ComboBox
                    placeholder={strings.Controls.AsyncListPickerFieldPlaceholder}
                    text={this.props.defaultListName}
                    label={strings.Controls.AsyncListPickerFieldLabel}
                    options={this.state.isLoading ? [{ key: "LOADING", text: ""}] : this.state.listOptions}
                    onRenderOption={(option: IComboBoxOption, defaultRender: (props: IComboBoxOption) => JSX.Element) => {
                        return option.key === "LOADING" ? <div className={styles.spinner}><Spinner size={SpinnerSize.xSmall} /></div> : defaultRender(option);
                    }}
                    onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption | undefined, index?: number | undefined, value?: string | undefined): void => {
                        if (option) {
                            this.props.onItemSelected(option);
                        }
                    }}
                    allowFreeInput={false}
                    useComboBoxAsMenuWidth={true}
                    onMenuOpen={async () => {
                        if (!this.state.isFetched) {
                            await this.fetchLists();
                        }
                    }}
                />
    }
}