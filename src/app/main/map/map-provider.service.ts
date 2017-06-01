import { Injectable, EventEmitter } from '@angular/core';
import { Dictionary } from "typescript-collections";
import { Map, MapType } from "./models";

@Injectable()
export class MapProvider {

    public maps: Array<Map>;

    public selectedMap: Map;
    public onMapChange: EventEmitter<any>;

    constructor() {

        this.maps = new Array<Map>();
        this.maps = [
            new Map(MapType.Google,
                "Google",
                "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&language=ja&region=JP",
                20,
                "",
                ['mt0', 'mt1', 'mt2', 'mt3']),

            new Map(MapType.Yandex,
                "Yandex",
                "http://vec{s}.maps.yandex.net/tiles?l=map&v=17.03.30-0&z={z}&x={x}&y={y}&scale=2&lang=ru_RU",
                17,
                "",
                ['01', '02', '03', '04']),
            new Map(MapType.Openstreet,
                "Openstreet",
                "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                22,
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                [])];
            this.selectedMap = this.maps[0];
            this.onMapChange = new EventEmitter();
    }

    updateMap(){
        this.onMapChange.emit();
    }

}



