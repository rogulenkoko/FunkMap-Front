import { EntityType } from "app/main/map/models";

export class BaseFilter {
    constructor(public searchText: string, public entityType: EntityType, public skip: number, public take: number){
        
    }

    public longitude: number;
    public latitude: number;
    public limit: number;

    public userLogin: string;
}