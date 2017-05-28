import { Injectable } from '@angular/core';
import { Dictionary } from "typescript-collections";

@Injectable()
export class MapProvider {

  public maps:Dictionary<MapType, Map>;

  constructor() {
    this.maps = new Dictionary<MapType, Map>();
        this.maps.setValue(MapType.GoogleStreet,
            new Map(MapType.GoogleStreet,
                "Map_GoogleTitle",
                59.9848, 30.2705,
                "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                20,
                "",
                ['mt0', 'mt1', 'mt2', 'mt3']));
        this.maps.setValue(MapType.GoogleHybrid,
            new Map(MapType.GoogleHybrid,
                "Map_GoogleHybrid",
                59.9848, 30.2705,
                "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
                20,
                "",
                ['mt0', 'mt1', 'mt2', 'mt3']));
        this.maps.setValue(MapType.GoogleSatellite,
            new Map(MapType.GoogleSatellite,
                "Map_GoogleSatellite",
                59.9848, 30.2705,
                "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                20,
                "",
                ['mt0', 'mt1', 'mt2', 'mt3']));
        this.maps.setValue(MapType.Yandex,
            new Map(MapType.Yandex,
                "Map_YandexTitle",
                59.9848, 30.2705,
                "http://vec{s}.maps.yandex.net/tiles?l=map&v=17.03.30-0&z={z}&x={x}&y={y}&scale=2&lang=ru_RU",
                17,
                "",
                ['01', '02', '03', '04']));
        this.maps.setValue(MapType.YandexHybrid,
            new Map(MapType.YandexHybrid,
                "Map_YandexHybrid",
                59.9848, 30.2705,
                "https://sat{s}.maps.yandex.net/tiles?l=sat&v=3.307.0&x={x}&y={y}&z={z}&lang=ru_RU",
                17,
                "",
                ['01', '02', '03', '04']));
        this.maps.setValue(MapType.Openstreet,
            new Map(MapType.Openstreet,
                "Map_OpenstreetTitle",
                59.9848, 30.2705,
                "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                22,
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                []));
   }

}

export class Map {
    constructor(
        public type: MapType
        , public title: string
        , public lat: number
        , public lon: number
        , public url: string
        , public maxZoom: number
        , public attribution: string
        , public subdomains: string[]) {
        this.zoom = 12;
    }

    public zoom: number;
}

export enum MapType {
    Yandex = 0,
    YandexHybrid = 1,
    GoogleStreet = 2,
    GoogleHybrid = 3,
    GoogleSatellite = 4,
    Openstreet = 5   
}