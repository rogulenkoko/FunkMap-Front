
export class BaseResponse{
    constructor(public success: boolean){

    }

    public static ToBaseResponse(data: any):BaseResponse{
        console.log(data);
        return new BaseResponse(data.Success);
    }
}