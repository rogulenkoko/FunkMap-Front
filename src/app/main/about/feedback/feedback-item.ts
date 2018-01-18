import { FileContent } from "app/main/messenger/models/message";


export class FeedbackItem{

    constructor(public feedbackType: FeedbackType, public message: string, public content?: Array<FileContent>){}


}

export enum FeedbackType{
    Another = 0,
    Bug = 1,
    Feature = 2
}