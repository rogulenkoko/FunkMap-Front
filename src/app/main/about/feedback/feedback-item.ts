
export class FeedbackItem{

    constructor(public feedbackType: FeedbackType, public message: string){}


}

export enum FeedbackType{
    Another = 0,
    Bug = 1,
    Feature = 2
}