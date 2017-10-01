import { NearestRequest } from "app/main/map/models";

export class FullLocationRequest extends NearestRequest {
    constructor(latitude: number, longitude: number, public skip: number, public take: number){
        super(latitude, longitude, take);
    }
}