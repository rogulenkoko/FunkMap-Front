import { Musician } from "../musician/models";


export class CreationResponse{
    constructor(public success: boolean){

    }

    public static ToCreationResponse(data: any):CreationResponse{
        return new CreationResponse(data.Success);
    }
}