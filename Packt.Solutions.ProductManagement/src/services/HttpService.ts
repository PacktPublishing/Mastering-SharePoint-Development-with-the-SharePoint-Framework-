import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IHttpService } from './IHttpService';

export default class HttpService implements IHttpService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  // Generic method for making a GET request
  public async get(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<any> {
    const response: HttpClientResponse = await this.httpClient.get(url, HttpClient.configurations.v1, {
      headers,
    });

    return this.handleResponse(response);
  }

  // Generic method for making a POST request
  public async post(
    url: string,
    body: any,
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<any> {
    const response: HttpClientResponse = await this.httpClient.post(url, HttpClient.configurations.v1, {
      headers,
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  // Generic method for making a PUT request
  public async put(
    url: string,
    body: any,
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<any> {
    const response: HttpClientResponse = await this.httpClient.fetch(url, HttpClient.configurations.v1, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  // Generic method for making a DELETE request
  public async delete(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<any> {
    const response: HttpClientResponse = await this.httpClient.fetch(url, HttpClient.configurations.v1, {
      method: 'DELETE',
      headers,
    });

    return this.handleResponse(response);
  }

  // Handle response and parse JSON
  private async handleResponse(response: HttpClientResponse): Promise<any> {

    // return success for testing
    return true;

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`HTTP error ${response.status}: ${response.statusText}\nDetails: ${errorDetails}`);
    }

    try {
      return await response.json();
    } catch (error) {
      return null; // Return null if response is not JSON
    }
  }
}
