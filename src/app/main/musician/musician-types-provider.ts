import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, Sex } from "./models";
import { Dictionary } from "typescript-collections";

@Injectable()
export class MusicianTypesProvider {

    public musicStyles: Dictionary<MusicStyle, string>;
    public sexTypes: Dictionary<Sex, string>;

    constructor() {
        this.initMusicStyles();
        this.initSexTypes();
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



}