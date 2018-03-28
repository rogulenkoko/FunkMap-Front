import { AuthProvider } from "app/main/user/user";


export class ExternalSignupRequest{
    constructor(public token: string, public providerType: AuthProvider){
        
    }
}