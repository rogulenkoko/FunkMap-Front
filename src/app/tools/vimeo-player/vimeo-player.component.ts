import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';

import { Player } from '@vimeo/player';


declare var Vimeo;

@Component({
  selector: 'vimeo-player',
  templateUrl: './vimeo-player.component.html',
  styleUrls: ['./vimeo-player.component.scss']
})
export class VimeoPlayerComponent implements OnInit, AfterViewInit {

  @Input() videoId: string;
  @Input() width: number;
  @Input() height: number;

  @ViewChild('vimeoPlayer') vimeoPlayer;
  private player: Player;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    var options = {
        id: Number(this.videoId),
        width: this.width,
        height: this.height,
        loop: true
    };
    this.player = new Vimeo.Player(this.vimeoPlayer.nativeElement, options);
  }

}
