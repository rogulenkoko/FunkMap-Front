import { Injectable, EventEmitter } from '@angular/core';
import { Track } from 'app/tools/soundcloud/track';
import { SoundcloudService } from 'app/tools/soundcloud/soundcloud.service';
import { SoundSettings } from 'app/tools/soundcloud/sound-settings';
import { locale } from 'moment';
@Injectable()
export class TrackListService {


  public tracks: Array<Track>;
  public lastTrack: Track;

  public settings: SoundSettings;

  public playlist: Array<Track>;

  public onTrackAdded: EventEmitter<number>;
  public onTrackDeleted: EventEmitter<number>;

  constructor(private soundcloudService: SoundcloudService) {
    this.tracks = [];
    this.playlist = [];
    this.onTrackAdded = new EventEmitter<number>();
    this.onTrackDeleted = new EventEmitter<number>();
    this.readSettings();
    this.soundcloudService.onFinished.subscribe(track=> this.playNext(track));
   }


   public addTrack(track: Track){
     this.tracks.push(track);
     this.onTrackAdded.emit(track.id);
   }

   public removeTrack(track: Track){
     this.tracks = this.tracks.filter(x=>x.id != track.id);
     this.onTrackDeleted.emit(track.id);
   }

   public play(track: Track){
    var playing = this.tracks.find(x=>x.isPlaying);

    this.playlist = this.tracks;
    
    if(playing){
      this.stop(playing);
    }

    track.isPlaying = true;
    this.lastTrack = track;
    this.soundcloudService.play(track);
  }

  public playNext(previous: Track){
    if(!this.playlist) return;
    var playingIndex = this.playlist.findIndex(x=>x.id == previous.id);
    var nextIndex;
    if(playingIndex == this.playlist.length - 1){
      nextIndex = 0;
    } else {
      nextIndex = playingIndex + 1;
    }
    this.play(this.playlist[nextIndex]);

  }

  public playPrev(next: Track){
    if(!this.playlist) return;
    var playingIndex = this.playlist.findIndex(x=>x.id == next.id);
    var prevIndex;
    if(playingIndex == 0){
      prevIndex = this.playlist.length - 1;
    } else {
      prevIndex = playingIndex - 1;
    }
    this.play(this.playlist[prevIndex]);

  }

  public stop(track: Track){
    track.isPlaying = false;
    this.soundcloudService.stop();
  }

  private soundSettingsKey = "sound_settings";

  public setSettings(settings: SoundSettings){
    this.settings = settings;

    var settingsJson = JSON.stringify(settings);
    localStorage.setItem(this.soundSettingsKey, settingsJson);
  }

  private readSettings(){
    var settings = JSON.parse(localStorage.getItem(this.soundSettingsKey)) as SoundSettings;
    console.log(settings);
    this.settings = settings;
  }
}
