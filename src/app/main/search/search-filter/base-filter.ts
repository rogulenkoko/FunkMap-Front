import { EntityType } from "app/main/map/models";

export class BaseFilter {
    constructor(public searchText: string, public entityType: EntityType, public skip: number, public take: number){
        
    }
}