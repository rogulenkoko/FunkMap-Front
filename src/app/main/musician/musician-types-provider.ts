import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, Sex } from "./models";
import { Dictionary } from "typescript-collections";
import { InstrumentType } from "app/main/musician/models/musician";

@Injectable()
export class MusicianTypesProvider {

    public musicStyles: Dictionary<MusicStyle, string>;
    public sexTypes: Dictionary<Sex, string>;
    public instruments: Dictionary<InstrumentType, string>;

    constructor() {
        this.initMusicStyles();
        this.initSexTypes();
        this.initInstruments();
     }

     private initMusicStyles(){
         this.musicStyles = new Dictionary<MusicStyle, string>();
         this.musicStyles.setValue(MusicStyle.Funk, "Funk");
         this.musicStyles.setValue(MusicStyle.HipHop, "HipHop");
         this.musicStyles.setValue(MusicStyle.Rock, "Rock");
     }

     private initSexTypes(){
        this.sexTypes = new Dictionary<Sex, string>();
        this.sexTypes.setValue(Sex.Male,"Sex_Male");
        this.sexTypes.setValue(Sex.Female,"Sex_Female");
     }

     private initInstruments(){
        this.instruments = new Dictionary<InstrumentType, string>();
        this.instruments.setValue(InstrumentType.Bass, "Bass");
        this.instruments.setValue(InstrumentType.Drums, "Drums");
        this.instruments.setValue(InstrumentType.Vocal, "Vocal");
        this.instruments.setValue(InstrumentType.Brass, "Brass");
        this.instruments.setValue(InstrumentType.Keyboard, "Keyboard");
        this.instruments.setValue(InstrumentType.Guitar, "Guitar");
     }



}