import { MSGraphClientV3 } from "@microsoft/sp-http";

export interface IPropertyPaneAsyncListPickerProps {
    msGraphClient: MSGraphClientV3;
    siteId: string;
    defaultListName: string;
}