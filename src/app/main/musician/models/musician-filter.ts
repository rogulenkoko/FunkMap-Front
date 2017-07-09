

import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { BaseFilter } from "app/main/search/search-filter/base-filter";
import { EntityType } from "app/main/map/models";

export class MusicianFilter extends BaseFilter {
    constructor(searchText: string, type: EntityType) {
        super(searchText, type);
    }
    public styles: Array<MusicStyle>;
    public instruments: Array<InstrumentType>;
    public expirience: ExpirienceType;
}