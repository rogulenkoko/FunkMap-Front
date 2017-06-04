
export class RegistrationRequest{
    constructor(public login: string, public password?: string){

    }

    public email: string;
}

export class RegistrationModel{
    constructor(public success: boolean){

    }

    public static ToRegistrationModel(data: any):RegistrationModel{
        var resulte = new RegistrationModel(data.Success);
        return resulte;
    }
}