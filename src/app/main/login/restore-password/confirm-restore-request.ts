export class ConfirmRestoreRequest{
    constructor(public loginOrEmail: string, public code: string, public password: string){
        
    }
}