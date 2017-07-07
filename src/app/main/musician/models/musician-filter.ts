

import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";

export class MusicianFilter {
    public searchText: string;
    public styles: Array<MusicStyle>;
    public instruments: Array<InstrumentType>;
    public expirience: ExpirienceType;
}