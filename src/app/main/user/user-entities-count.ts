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

export class UserEntitiesCountResponse{
    public counts: Array<UserEntitiesCountInfo>;
    public totalCount: number;

    static ToUserEntitiesCountResponse(data: any): UserEntitiesCountResponse{
        var result = new UserEntitiesCountResponse();
        result.totalCount = data.TotalCount;
        result.counts = UserEntitiesCountInfo.ToUserEntitiesCounts(data.Counts);
        return result;
    }
}