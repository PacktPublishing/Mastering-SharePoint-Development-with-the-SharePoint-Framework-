import { IList } from "../models/IList";

export interface IListService {
    getLists(siteId: string): Promise<IList[]>;
}