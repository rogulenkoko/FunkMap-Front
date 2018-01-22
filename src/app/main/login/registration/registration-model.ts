
export class RegistrationRequest{
    constructor(public login: string, public email: string, public password: string, public name: string, public locale: string){

    }
}

export class RegistrationModel{
    constructor(public success: boolean){

    }

    public static ToRegistrationModel(data: any):RegistrationModel{
        var resulte = new RegistrationModel(data.Success);
        return resulte;
    }
}