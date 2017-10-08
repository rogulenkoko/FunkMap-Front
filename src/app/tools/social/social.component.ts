import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  private _vkLink: string;

  @Input() get vkLink(): string {
    return this._vkLink;
  }

  set vkLink(value: string) {
    if (value) this._vkLink = value.includes(this.vk) ? value.replace(this.vk, "") : value;
    else this._vkLink = value;
  }

  private _faceBookLink: string;

  @Input() get facebookLink(): string {
    return this._faceBookLink;
  }

  set facebookLink(value: string) {

    if (value) {
      //из-за того, что есть всякие https://ru-ru.facebook.com/ и тд
      var facebookBase = "facebook.com/";
      var splitted = value.split(facebookBase);
      this._faceBookLink = value.includes(facebookBase) ? splitted[splitted.length - 1] : value;
    } else {
      this._faceBookLink = value;
    }
  }

  private _youTubeLink: string;

  @Input() get youTubeLink(): string {
    return this._youTubeLink;
  }

  set youTubeLink(value: string) {
    if (value) this._youTubeLink = value.includes(this.youTube) ? value.replace(this.youTube, "") : value;
    else this._youTubeLink = value;
  }

  private _soundCloudLink: string;

  @Input() get soundCloudLink(): string {
    return this._soundCloudLink;
  }

  set soundCloudLink(value: string) {
    if (value) this._soundCloudLink = value.includes(this.soundCloud) ? value.replace(this.soundCloud, "") : value;
    else this._soundCloudLink = value;
  }

  @Input() isMinified: boolean = false;

  private vk = "https://vk.com/";
  private facebook = "https://www.facebook.com/";
  private youTube = "https://www.youtube.com/";
  private soundCloud = "https://soundcloud.com/";

  constructor() { }

  ngOnInit() {

  }

}
