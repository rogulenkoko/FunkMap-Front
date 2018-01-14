export class ConfirmationRequest{
    constructor(public login: string, public email: string, public code: string){

    }
}

export class ConfirmationResponse{
    constructor(public success:boolean){

    }
}