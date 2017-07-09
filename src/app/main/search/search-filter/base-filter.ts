import { EntityType } from "app/main/map/models";

export class BaseFilter {
    constructor(public searchText: string, public entityType: EntityType){
        
    }
}