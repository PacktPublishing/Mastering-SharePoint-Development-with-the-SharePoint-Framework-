import { MSGraphClientV3 } from "@microsoft/sp-http";
import { IListService } from "./IListService";
import { IList } from "../models/IList";
import { Log } from "@microsoft/sp-core-library";

export class ListService implements IListService {
    
    private _msGraphClient: MSGraphClientV3;

    constructor(msGraphClient: MSGraphClientV3) {
      this._msGraphClient = msGraphClient;
    }

    public async getLists(siteId: string): Promise<IList[]> {

        try {

            const response = await this._msGraphClient.api(`sites/${siteId}/lists?$select=id,displayName,list`).get();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const items: IList[] = response.value.filter((item: any) => item.list?.hidden === false &&  item.list?.template === 'genericList').map((item: any) => {
                return {
                    title: item.displayName,
                    id: item.id
                } as IList;
            });

            return items;

        } catch (error) {
            Log.error("IListService", error);
            return [];
        }
    }
}