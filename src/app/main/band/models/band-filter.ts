import { BaseFilter } from "app/main/search/search-filter/base-filter";
import { MusicStyle } from "app/main/musician/models";

export class BandFilter extends BaseFilter {
    public styles: Array<MusicStyle>;
}