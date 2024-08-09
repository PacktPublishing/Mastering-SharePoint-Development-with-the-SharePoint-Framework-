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
  }
}

declare module 'PackProductCatalogWebPartStrings' {
  const strings: IPackProductCatalogWebPartStrings;
  export = strings;
}
