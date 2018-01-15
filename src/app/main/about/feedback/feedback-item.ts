
export class FeedbackItem{

    constructor(public type: FeedbackType){}


}

export enum FeedbackType{
    Another = 0,
    Bug = 1,
    Feature = 2
}