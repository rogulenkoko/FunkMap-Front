
import { EntityType } from "app/main/map/models";
import { InstrumentType, ExpirienceType, MusicStyle } from "app/main/musician/models";

export class SearchItem {
    public login: string;
    public userLogin: string;
    public title: string;
    public image: string;
    public imageId: string;
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
        result.userLogin = data.UserLogin;
        result.title = data.Title;
        result.imageId = data.AvatarId;
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
        console.log(data);
        if(!data) return result;
        if(data){
            data.forEach(item => {
                result.push(SearchItem.ToSearchItem(item));
            });
        }
        return result;
    }
}