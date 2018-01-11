export class InviteParticipantsRequest{
    constructor(public dialogId: string, public invitedUserLogins: Array<string>){

    }
}