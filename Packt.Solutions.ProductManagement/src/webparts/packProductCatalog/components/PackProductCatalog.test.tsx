import '@testing-library/jest-dom';
import { render,screen, waitFor } from '@testing-library/react';
import PackProductCatalog from './PackProductCatalog';
import { ProductCatalogService } from '../../../services/ProductCatalogService';
import * as React from 'react';
import { ProductSizes } from '../../../models/IProductCatalogItem';
import { MSGraphClientV3 } from '@microsoft/sp-http';

// Mock strings
jest.mock('PackProductCatalogWebPartStrings', () => {
  return {
    Labels: {
      Size: "Size",
      StockLevel: "Stock",
      Reference: "Reference",
    },
  }
});

// Mock SPFx utility class
jest.mock('@microsoft/sp-image-helper', () => ({
  ImageHelper: {
    convertToImageUrl: jest.fn().mockResolvedValue('https://via.placeholder.com/150')
  }
}));

describe("Product catalog tests suite", () => {
  it('Display the list of products retrieved from the list', async () => {
  
    const productCatalogService = new ProductCatalogService({} as MSGraphClientV3);
  
    jest.spyOn(productCatalogService, 'getProducts').mockResolvedValue([
      {
        modelName: "Product 1",
        itemColour: "Red",	
        itemPicture: "https://via.placeholder.com/150",
        lastOrderDate: new Date("2021-01-01"),
        productReference: "REF-001",
        retailPrice: 100,
        size: ProductSizes.L,
        stockLevel: 10
      },
      {
        modelName: "Product 2",
        itemColour: "Blue",	
        itemPicture: "https://via.placeholder.com/150",
        lastOrderDate: new Date("2021-01-01"),
        productReference: "REF-002",
        retailPrice: 50,
        size: ProductSizes.L,
        stockLevel: 10
      },
      {
        modelName: "Product 3",
        itemColour: "Yellow",	
        itemPicture: "https://via.placeholder.com/150",
        lastOrderDate: new Date("2021-01-01"),
        productReference: "REF-003",
        retailPrice: 78,
        size: ProductSizes.L,
        stockLevel: 10
      }
    ]);
  
    render(
        <PackProductCatalog 
          itemsCount={10}
          listName='ProductCatalog'
          productCatalogService={productCatalogService}
          siteId='00000000-0000-0000-0000-000000000000'
        />
    );
  
    // Waiting for the list of products to be fetched
    await waitFor(() => {
      expect(productCatalogService.getProducts).toHaveBeenCalledTimes(1);
    });
  
    // Ensure we have 3 items
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    // Test all products are displayed
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });
});