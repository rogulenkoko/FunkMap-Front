
import { EntityType } from "app/main/map/models";
import { InstrumentType } from "app/main/musician/models";

export class SearchItem {
    public title: string;
    public image: string;
    public type: EntityType;

    public instrument: InstrumentType;
}