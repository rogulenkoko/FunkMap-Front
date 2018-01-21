
import { SearchItem } from "app/main/search/search-item";

export class SearchResponse {
    public items: Array<SearchItem>;
    public allCount: number;


    public static ToSearchResponse(data: any):SearchResponse{
        var result = new SearchResponse();
        result.items = SearchItem.ToSearchItems(data.Items);
        result.allCount = data.AllCount;
        return result;
    }
}