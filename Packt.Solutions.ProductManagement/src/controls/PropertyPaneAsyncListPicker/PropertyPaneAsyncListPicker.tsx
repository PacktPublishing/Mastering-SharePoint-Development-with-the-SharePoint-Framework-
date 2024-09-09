import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IPropertyPaneAsyncListPickerProps } from "./IPropertyPaneAsyncListPickerProps";
import { IPropertyPaneComboBoxInternalProps } from "./IPropertyPaneAsyncListPickerInternalProps";
import * as ReactDom from 'react-dom';
import * as React from 'react';
import AsyncListPicker from "./components/AsyncListPicker";
import { IComboBoxOption } from "@fluentui/react";

export class PropertyPaneAsyncListPicker implements IPropertyPaneField<IPropertyPaneAsyncListPickerProps> {

    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public shouldFocus?: boolean;
    public properties: IPropertyPaneComboBoxInternalProps;
    private elem: HTMLElement;
    
    constructor(targetProperty: string, properties: IPropertyPaneAsyncListPickerProps) {

        this.targetProperty = targetProperty;
        this.properties = {
            ...properties,
            key: targetProperty,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }
    
    private onDispose(element: HTMLElement): void {
        ReactDom.unmountComponentAtNode(element);
    }

    private onRender(domElement: HTMLElement, context?: unknown, changeCallback?: (targetProperty?: string, newValue?: string) => void): void {

        if (!this.elem) {
            this.elem = domElement;
        }

        const element = <AsyncListPicker 
                            {...this.properties}                            
                            onItemSelected={((item: IComboBoxOption) => {
                                if (changeCallback) {
                                    changeCallback(this.targetProperty, item.text);
                                }
                            }).bind(this)}
                        />;

        ReactDom.render(element, domElement);
    }
    
}