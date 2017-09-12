import { EntityType } from "app/main/map/models";

export class UserEntitiesCountInfo {
    constructor(public entityType: EntityType, public count: number, public logins: Array<string>){

    }

    public static ToUserEntitiesCounts(data: any): Array<UserEntitiesCountInfo>{
        var result = new Array<UserEntitiesCountInfo>();
        if(!data) return result;
        data.forEach(element => {
            result.push(new UserEntitiesCountInfo(element.Type, element.Count, element.Logins));
        });
        return result;
    }
}