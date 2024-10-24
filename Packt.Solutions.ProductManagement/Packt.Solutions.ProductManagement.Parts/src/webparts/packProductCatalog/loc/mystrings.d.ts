declare interface IPackProductCatalogWebPartStrings {
  Labels: {
    Size: string;
    StockLevel: strings;
    Reference: string;
  };
  TopActions: {
    OneTile: string;
    TwoTiles: string;
    ThreeTiles: string;
  },
  PropertyPane: {
    SettingsGroupName: string;
    ItemsCountFieldLabel: string;
    UseDynamicSearchQueryFieldLabel: string;
    SearchQueryDynamicField: string;
  },
  Controls: {
    AsyncListPickerFieldLabel: string;
    AsyncListPickerFieldPlaceholder: string;
  }
}

declare module 'PackProductCatalogWebPartStrings' {
  const strings: IPackProductCatalogWebPartStrings;
  export = strings;
}
