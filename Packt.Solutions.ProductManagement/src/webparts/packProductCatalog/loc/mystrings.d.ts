declare interface IPackProductCatalogWebPartStrings {
  Labels: {
    Size: string;
    StockLevel: strings;
    Reference: string;
  };
}

declare module 'PackProductCatalogWebPartStrings' {
  const strings: IPackProductCatalogWebPartStrings;
  export = strings;
}
