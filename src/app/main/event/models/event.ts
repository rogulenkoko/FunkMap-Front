
export class EventModel{
    constructor(public id: string, public type: EventType, public name: string, public date: Date){

    }

    public description: string;

    public latitude: number;
    public longitude: number;
}

export enum EventType{
    Concert = 1,
    MasterClass = 2,
    Jam = 3
}