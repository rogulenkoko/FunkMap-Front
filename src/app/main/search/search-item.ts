
import { EntityType } from "app/main/map/models";
import { InstrumentType, ExpirienceType, MusicStyle } from "app/main/musician/models";

export class SearchItem {
    public login: string;
    public title: string;
    public image: string;
    public type: EntityType;
    public latitude: number;
    public longitude: number;

    public instrument: InstrumentType;
    public expirience: ExpirienceType;

    public address: string;
    public website: string;

    public styles: Array<MusicStyle>;

    //Клиентское
    public isFavourite: boolean;


    public static ToSearchItem(data: any): SearchItem{
        var result = new SearchItem();
        result.login = data.Login;
        result.title = data.Title;
        result.image = data.Avatar;
        result.instrument = data.Instrument;
        result.type = data.Type;
        result.latitude = data.Latitude;
        result.longitude = data.Longitude;
        result.address = data.Address;
        result.website = data.Website;
        result.expirience = data.Expirience;
        result.styles = data.Styles;
        return result;
    }
    public static ToSearchItems(data: any): Array<SearchItem>{
        var result = Array<SearchItem>();
        if(data){
            data.forEach(item => {
                result.push(SearchItem.ToSearchItem(item));
            });
        }
        return result;
    }
}