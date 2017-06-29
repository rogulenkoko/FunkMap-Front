
import { EntityType } from "app/main/map/models";
import { InstrumentType } from "app/main/musician/models";

export class SearchItem {
    public login: string;
    public title: string;
    public image: string;
    public type: EntityType;

    public instrument: InstrumentType;


    //Клиентское
    public isFavourite: boolean;


    public static ToSearchItem(data: any): SearchItem{
        var result = new SearchItem();
        result.login = data.Login;
        result.title = data.Title;
        result.image = data.Avatar;
        result.instrument = data.Instrument;
        result.type = data.Type;
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