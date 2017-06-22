

export class BaseModel {
    constructor(public login?:string, public name?:string){

    }
    public userLogin: string;
    public videoYoutube: string;
    public latitude: number;
    public longitude: number;

    public description: string;

    public avatar: string;//байты
    public vkLink: string;
    public youTubeLink: string;
    public facebookLink: string;
}