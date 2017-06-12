
export class BaseResponse{
    constructor(public success: boolean){

    }

    public static ToBaseResponse(data: any):BaseResponse{
        return new BaseResponse(data.Success);
    }
}