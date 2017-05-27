export enum MapType{
  Google = 1,
  Yandex = 2
}

export class MapPoint{
  constructor(public lat: number, public lon: number){

  }
}