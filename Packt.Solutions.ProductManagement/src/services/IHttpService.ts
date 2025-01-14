export interface IHttpService {
    get(url: string, headers?: Record<string, string>): Promise<any>;
    post(url: string, body: any, headers?: Record<string, string>): Promise<any>;
    put(url: string, body: any, headers?: Record<string, string>): Promise<any>;
    delete(url: string, headers?: Record<string, string>): Promise<any>;
}
