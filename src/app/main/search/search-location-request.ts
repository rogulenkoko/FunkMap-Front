import { NearestRequest } from "app/main/map/models";

export class FullLocationRequest extends NearestRequest {
    constructor(latitude: number, longitude: number, radiusDeg: number){
        super(latitude, longitude, radiusDeg);
    }

    public skip: number;
    public take: number;
}