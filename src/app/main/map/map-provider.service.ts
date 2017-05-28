import { Injectable } from '@angular/core';
import { Dictionary } from "typescript-collections";
import { Map, MapType, MapPoint } from "./models";

@Injectable()
export class MapProvider {

  public maps:Dictionary<MapType, Map>;

  public selectedMap: MapType = 1;

  constructor() {

    this.maps = new Dictionary<MapType, Map>();
        this.maps.setValue(MapType.Google,
            new Map(MapType.Google,
                "Map_GoogleTitle",
                "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                20,
                "",
                ['mt0', 'mt1', 'mt2', 'mt3']));

        this.maps.setValue(MapType.Yandex,
            new Map(MapType.Yandex,
                "Map_YandexTitle",
                "http://vec{s}.maps.yandex.net/tiles?l=map&v=17.03.30-0&z={z}&x={x}&y={y}&scale=2&lang=ru_RU",
                17,
                "",
                ['01', '02', '03', '04']));
        this.maps.setValue(MapType.Openstreet,
            new Map(MapType.Openstreet,
                "Map_OpenstreetTitle",
                "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                22,
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
                []));
   }

}



