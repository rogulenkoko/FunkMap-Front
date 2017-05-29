

export class User{
    public login: string;
    public image: string;

    public entities: Array<EntityType>;

}

export enum EntityType{
    Musician = 1,
    Shop = 2,
    Group = 3
}