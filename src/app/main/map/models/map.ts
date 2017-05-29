export class Map {
    constructor(
        public type: MapType
        , public title: string
        , public url: string
        , public maxZoom: number
        , public attribution: string
        , public subdomains: string[]) {
        this.zoom = 12;
    }

    public zoom: number;
}

export enum MapType {
    Yandex = 1,
    Google = 2,
    Openstreet = 3   
}